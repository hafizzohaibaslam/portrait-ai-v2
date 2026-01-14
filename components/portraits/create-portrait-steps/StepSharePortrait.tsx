"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Link2, ChevronDown, X, Check } from "lucide-react";
import ThemedButton from "@/components/shared/ThemedButton";
import {
  useGetPortraitCollaboratorsQuery,
  type Collaborator,
} from "@/hooks/portraits/useGetPortraitCollaboratorsQuery";
import { useUpdatePortraitCollaboratorsMutation } from "@/hooks/portraits/useUpdatePortraitCollaboratorsMutation";
import { toast } from "sonner";
import type { Portrait } from "@/types/portrait-types";
import { cn } from "@/lib/utils";

const COLLABORATOR_ROLES = [
  "view only",
  "can edit",
  "can comment",
  "Owner",
] as const;

type StepSharePortraitProps = {
  portrait: Portrait;
  onNext: () => void;
};

const StepSharePortrait = ({ portrait, onNext }: StepSharePortraitProps) => {
  const [inputEmail, setInputEmail] = useState("");
  const [addedEmails, setAddedEmails] = useState<string[]>([]);
  const [newCollaboratorRole, setNewCollaboratorRole] = useState("view only");
  const [globalRole, setGlobalRole] = useState("No access");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openNewRoleDropdown, setOpenNewRoleDropdown] = useState(false);
  const [localCollaborators, setLocalCollaborators] = useState<Collaborator[]>(
    []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const newRoleRef = useRef<HTMLDivElement>(null);

  const { data: collaboratorsData } = useGetPortraitCollaboratorsQuery(
    portrait.portrait_id
  );
  const updateCollaboratorsMutation = useUpdatePortraitCollaboratorsMutation();

  useEffect(() => {
    if (collaboratorsData) {
      setLocalCollaborators(collaboratorsData);
    }
  }, [collaboratorsData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        newRoleRef.current &&
        !newRoleRef.current.contains(event.target as Node)
      ) {
        setOpenNewRoleDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addEmailToChips = () => {
    const trimmed = inputEmail.trim();
    const isDuplicate =
      addedEmails.includes(trimmed) ||
      localCollaborators.some((c) => c.email === trimmed);

    if (trimmed && !isDuplicate) {
      setAddedEmails([...addedEmails, trimmed]);
      setInputEmail("");
    } else if (isDuplicate) {
      toast.error("User already added");
    }
  };

  const removeEmailChip = (emailToRemove: string) => {
    setAddedEmails(addedEmails.filter((email) => email !== emailToRemove));
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
    setOpenNewRoleDropdown(false);
  };

  const toggleNewRoleDropdown = () => {
    setOpenNewRoleDropdown((prev) => !prev);
    setOpenDropdown(null);
  };

  const changePermission = (index: number, newRole: string) => {
    const newCollabs = [...localCollaborators];
    newCollabs[index].role = newRole;
    setLocalCollaborators(newCollabs);
    setOpenDropdown(null);
  };

  const changeNewCollaboratorRole = (role: string) => {
    setNewCollaboratorRole(role);
    setOpenNewRoleDropdown(false);
  };

  const changeGlobalRole = (role: string) => {
    setGlobalRole(role);
    setOpenDropdown(null);
  };

  const handleSubmit = async () => {
    if (!portrait.portrait_id) return;

    try {
      await updateCollaboratorsMutation.mutateAsync({
        portraitId: portrait.portrait_id,
        payload: {
          collaborators: localCollaborators,
          addedEmails,
          newCollaboratorRole,
        },
      });
      onNext();
    } catch (error) {
      // Error is handled by mutation
    }
  };

  return (
    <div>
      <div className="max-w-[500px]">
        <div className="text-xl lg:text-[28px]">
          Share "{portrait.name || "Portrait name"}"
        </div>
        <div className="font-light text-lg mt-4">
          Give people access to view, collaborate, and more.
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center w-full">
        <div className="flex flex-col items-start gap-5 w-full">
          {/* Email Input Row */}
          <div className="w-full md:flex justify-between items-center gap-2 relative">
            <div className="flex-1 min-h-[46px] px-4 py-2 bg-white rounded-lg border border-gray-3 flex flex-wrap items-center gap-2.5">
              {addedEmails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1 pl-1 pr-2 py-1 rounded-2xl border border-purple-001 box-border"
                >
                  <div className="w-6 h-6 flex justify-center items-center rounded-full bg-accent-purple-001 text-dominant-purple-main text-[10px] font-medium leading-none">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-off-black text-sm font-light leading-5">
                    {email}
                  </span>
                  <button
                    onClick={() => removeEmailChip(email)}
                    className="ml-1 text-off-black hover:text-red-error"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder={
                  addedEmails.length > 0 ? "" : "Add contributor email"
                }
                className="flex-1 min-w-[150px] text-off-black text-sm font-light leading-5 tracking-wide outline-none placeholder:text-gray-5"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addEmailToChips();
                }}
              />
              {inputEmail && (
                <button
                  onClick={addEmailToChips}
                  className="text-dominant-purple-main text-sm font-normal leading-5 tracking-wide cursor-pointer hover:font-medium"
                >
                  Add
                </button>
              )}
            </div>

            {/* New Role Dropdown Trigger */}
            <div className="relative mt-2 md:mt-0" ref={newRoleRef}>
              <div
                className="h-[46px] px-4 py-3 bg-white rounded-lg border border-gray-3 flex justify-center items-center gap-2.5 cursor-pointer min-w-[140px]"
                onClick={toggleNewRoleDropdown}
              >
                <div className="text-off-black text-base font-light leading-4 tracking-wide whitespace-nowrap">
                  {newCollaboratorRole}
                </div>
                <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
              </div>

              {/* New Role Permission Dropdown */}
              {openNewRoleDropdown && (
                <div className="z-[1] absolute right-0 top-12 w-[185px] py-3 bg-white rounded-lg border border-gray-3 shadow-lg flex flex-col gap-1">
                  {COLLABORATOR_ROLES.map((role) => (
                    <div
                      key={role}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-off-black text-sm font-light"
                      onClick={() => changeNewCollaboratorRole(role)}
                    >
                      <span>{role}</span>
                      {newCollaboratorRole === role && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Collaborator List */}
          <div className="w-full flex flex-col items-start gap-6 md:gap-5 relative">
            {/* Anyone with link */}
            <div className="w-full md:flex justify-between items-center relative">
              <div className="flex justify-start items-center gap-3">
                <Globe className="w-10 h-10 text-dominant-purple-main" />
                <div className="text-off-black text-base font-normal leading-4 tracking-wide">
                  Anyone with link
                </div>
              </div>
              <div
                className="mt-2 md:mt-0 relative"
                ref={openDropdown === -1 ? dropdownRef : null}
              >
                <div
                  className="flex justify-end items-center gap-1 cursor-pointer"
                  onClick={() => toggleDropdown(-1)}
                >
                  <div className="text-off-black text-base font-light leading-4 tracking-wide">
                    {globalRole}
                  </div>
                  <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
                </div>

                {/* Global Permission Dropdown */}
                {openDropdown === -1 && (
                  <div className="absolute right-0 top-8 w-[185px] py-3 bg-white rounded-lg border border-gray-3 shadow-lg z-[1] flex flex-col gap-1">
                    {COLLABORATOR_ROLES.map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-off-black text-sm font-light"
                        onClick={() => changeGlobalRole(role)}
                      >
                        <span>{role}</span>
                        {globalRole === role && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                    <div className="h-[1px] bg-gray-3 my-1 mx-2"></div>
                    <div
                      className="px-4 py-2 text-red-error text-sm font-light cursor-pointer hover:bg-gray-50"
                      onClick={() => changeGlobalRole("No access")}
                    >
                      Revoke Access
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* List Items */}
            {localCollaborators.map((collab, index) => (
              <div
                key={index}
                className="w-full md:flex justify-between items-center relative"
              >
                <div className="flex justify-start items-center gap-3">
                  {collab.img ? (
                    <img
                      className="w-10 h-10 rounded-full shadow-sm object-cover"
                      src={collab.img}
                      alt={collab.email}
                    />
                  ) : (
                    <div
                      className={cn(
                        "w-10 h-10 px-[17px] py-4 rounded-3xl flex flex-col justify-center items-center gap-2.5",
                        collab.bg || "bg-accent-purple-001"
                      )}
                    >
                      <div
                        className={cn(
                          "text-base font-medium leading-4",
                          collab.color || "text-dominant-purple-main"
                        )}
                      >
                        {collab.email.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  <div className="text-off-black text-base font-normal leading-4 tracking-wide">
                    {collab.email}
                  </div>
                </div>

                <div
                  className="relative"
                  ref={openDropdown === index ? dropdownRef : null}
                >
                  <div
                    className="flex justify-end items-center gap-1 cursor-pointer"
                    onClick={() =>
                      collab.role !== "Owner" && toggleDropdown(index)
                    }
                  >
                    <div
                      className={cn(
                        "text-base font-light leading-4 tracking-wide",
                        collab.role === "Owner"
                          ? "text-black-003"
                          : "text-off-black"
                      )}
                    >
                      {collab.role}
                    </div>
                    {collab.role !== "Owner" && (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>

                  {/* Permission Dropdown */}
                  {openDropdown === index && (
                    <div className="absolute right-0 top-8 w-[185px] py-3 bg-white rounded-lg border border-gray-3 shadow-lg z-[1] flex flex-col gap-1">
                      {COLLABORATOR_ROLES.map((role) => (
                        <div
                          key={role}
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-off-black text-sm font-light"
                          onClick={() => changePermission(index, role)}
                        >
                          <span>{role}</span>
                          {collab.role === role && (
                            <Check className="w-4 h-4" />
                          )}
                        </div>
                      ))}
                      <div className="h-[1px] bg-gray-3 my-1 mx-2"></div>
                      <div className="px-4 py-2 text-red-error text-sm font-light cursor-pointer hover:bg-gray-50">
                        Revoke Access
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 w-full md:flex justify-between items-center mt-4">
        {/* Copy Link */}
        <button className="w-full md:w-fit h-[46px] px-12 py-3 bg-white rounded-3xl border border-gray-3 shadow-sm flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors">
          <Link2 className="w-5 h-5 text-off-black" />
          <div className="text-center text-off-black text-base font-medium leading-5 tracking-wide">
            Copy link
          </div>
        </button>

        {/* Save Button */}
        <ThemedButton
          variant="black"
          rounded="lg"
          onClick={handleSubmit}
          loading={updateCollaboratorsMutation.isPending}
          className="mt-4 md:mt-0 md:min-w-[200px]"
        >
          Save
        </ThemedButton>
      </div>
    </div>
  );
};

export default StepSharePortrait;
