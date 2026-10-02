"use client";

import { Menu } from "@base-ui/react/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/app/actions/auth";
import { roleFor, type UserType } from "@/components/profile/role-style";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/home";
import { newPost } from "@/content/post";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type AccountMenuProps = {
  name: string;
  initials: string;
  /** `null` until onboarding is complete. */
  userType: UserType | null;
};

const itemClass =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-[14px] font-medium text-v-text no-underline outline-none hover:text-v-text data-[highlighted]:bg-v-beige-2 aria-[current=page]:bg-v-beige-2";

const separator = <Menu.Separator className="mx-2 my-1 h-px [background:var(--bio-hairline)]" />;

/** Avatar pill that opens the account dropdown: profile links and logout. */
export function AccountMenu({ name, initials, userType }: AccountMenuProps) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const role = userType ? roleFor(userType) : null;
  const firstName = name.split(/\s+/)[0];
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={site.account.triggerLabel}
        className="group flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[var(--bio-hairline)] bg-v-paper py-0 pr-3 pl-0.5 text-[14px] font-medium text-v-text data-[popup-open]:border-v-edge data-[popup-open]:bg-v-beige-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v-brand"
      >
        <Avatar
          variant={role?.style.avatar ?? "default"}
          className="size-[38px] text-[13px] font-bold [box-shadow:none]"
        >
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span>{firstName}</span>
        <Icon
          name="chevron-down"
          className="size-4 transition-transform duration-200 group-data-[popup-open]:rotate-180"
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={8} className="z-50">
          <Menu.Popup
            aria-label={site.account.menuLabel}
            className="flex w-[260px] flex-col gap-0.5 rounded-[20px] bg-v-paper p-2 text-v-text shadow-[0_12px_32px_-12px_rgba(17,17,17,.18),0_0_0_1px_var(--bio-hairline)] outline-none"
          >
            <div className="flex items-center gap-3 p-3">
              <Avatar
                variant={role?.style.avatar ?? "default"}
                className="size-11 text-[15px] font-bold [box-shadow:none]"
              >
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[15px] font-semibold">{name}</span>
                {role && (
                  <span className={cn("text-[12px] font-semibold", role.style.text)}>
                    {role.role.title}
                  </span>
                )}
              </span>
            </div>
            {separator}
            {userType ? (
              <>
                <Menu.LinkItem
                  render={<Link href={site.account.myProfileHref} />}
                  aria-current={current(site.account.myProfileHref)}
                  className={itemClass}
                >
                  <Icon name="user" className="size-[18px]" />
                  {site.account.myProfileLabel}
                </Menu.LinkItem>
                <Menu.LinkItem
                  render={<Link href={profile.edit.href} />}
                  aria-current={current(profile.edit.href)}
                  className={itemClass}
                >
                  <Icon name="pencil" className="size-[18px]" />
                  {profile.editProfile}
                </Menu.LinkItem>
                <Menu.LinkItem
                  render={<Link href={newPost.href} />}
                  aria-current={current(newPost.href)}
                  className={itemClass}
                >
                  <Icon name="plus" className="size-[18px]" />
                  {newPost.navLabel}
                </Menu.LinkItem>
              </>
            ) : (
              <Menu.LinkItem
                render={<Link href={site.completeProfileHref} />}
                aria-current={current(site.completeProfileHref)}
                className={itemClass}
              >
                <Icon name="pencil" className="size-[18px]" />
                {site.completeProfileLabel}
              </Menu.LinkItem>
            )}
            {separator}
            <Menu.Item className={itemClass} onClick={() => startTransition(() => logout())}>
              <Icon name="log-out" className="size-[18px]" />
              {site.logoutLabel}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
