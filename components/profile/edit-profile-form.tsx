"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { FieldError, FormField, FormMessage, TextareaField } from "@/components/forms/form-field";
import { type Role, RoleChoice } from "@/components/shared/role-choice";
import { Button } from "@/components/ui/button";
import { onboarding } from "@/content/auth";
import { profile } from "@/content/profile";
import type { EditableProfile } from "./types";

/** Name, role and biography, saved together; redirects to /perfil on success. */
export function EditProfileForm({ initial }: { initial: EditableProfile }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  const [name, setName] = useState(state?.values?.name ?? initial.name);
  const [role, setRole] = useState<Role>(
    (state?.values?.userType as Role | undefined) ?? initial.userType,
  );
  const [bio, setBio] = useState(state?.values?.biography ?? initial.biography);

  const selected = onboarding.role.options.find((option) => option.value === role);
  const roleErrors = state?.errors?.userType;

  return (
    <form action={action} className="flex flex-col gap-8">
      <FormMessage message={state?.message} />

      <FormField
        id="name"
        name="name"
        label={profile.edit.name.label}
        autoComplete="name"
        errors={state?.errors?.name}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-medium" aria-hidden="true">
          {profile.edit.role.legend}
        </p>
        <RoleChoice legend={profile.edit.role.legend} value={role} onChange={setRole} />
        {roleErrors && <FieldError id="role-error" errors={roleErrors} />}
      </div>

      <TextareaField
        id="bio"
        name="biography"
        label={profile.edit.bio.label}
        hint={profile.edit.bio.help}
        errors={state?.errors?.biography}
        showCount
        rows={6}
        maxLength={onboarding.bio.maxLength}
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        placeholder={selected?.bioPlaceholder}
      />

      <div className="flex flex-wrap justify-end gap-3">
        <Button asChild variant="outline" size="lg">
          <Link href="/perfil">{profile.edit.cancel}</Link>
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={!name.trim() || !bio.trim()}
          loading={pending}
        >
          {profile.edit.save}
        </Button>
      </div>
    </form>
  );
}
