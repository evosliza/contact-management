import { FC } from "react";
import { FieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Contact } from "../types";
import { addContact, updateContact } from "../api/contacts";

// FieldInfo remains the same
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <span className="text-red-500 text-sm">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </span>
  );
}

// Zod schema for form validation
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  userName: z.string().min(1, "Username is required"),
  profilePicture: z.string().url("Invalid URL"),
  description: z.string().optional(),
});

interface ContactFormProps {
  onFormClose: (newContact: Contact | null) => void;
  contact?: Contact | null;
}

const ContactForm: FC<ContactFormProps> = ({ onFormClose, contact }) => {
  const form = useForm({
    defaultValues: {
      name: contact?.name || "",
      userName: contact?.userName || "",
      profilePicture: contact?.profilePicture || "",
      description: contact?.description || "",
    } as Partial<Contact>,
    onSubmit: async ({ value }) => {
      // Validate the entire form using Zod
      try {
        contactSchema.parse(value);
        const newContact = contact
          ? await updateContact({ ...value, id: contact.id })
          : await addContact(value);
        onFormClose(newContact);
        form.reset();
      } catch (error) {
        console.error("Validation failed:", error);
      }
    },
  });

  const handleReset = () => {
    form.reset();
  };

  const handleCloseForm = () => {
    onFormClose(null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex h-full w-full items-center"
    >
      <div className="p-2 bg-white flex flex-col h-full gap-2 items-center">
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              const result = contactSchema.shape.name.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0].message;
            },
          }}
          children={(field) => (
            <div className="flex flex-col gap-2 text-black">
              <label htmlFor={field.name} className="text-gray-600">
                Name:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-72 p-2 border border-gray-300 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        {/* UserName Field */}
        <form.Field
          name="userName"
          validators={{
            onChange: ({ value }) => {
              const result = contactSchema.shape.userName.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0].message;
            },
          }}
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-gray-600">
                Username:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-72 p-2 border border-gray-300 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        {/* Profile Picture Field */}
        <form.Field
          name="profilePicture"
          validators={{
            onChange: ({ value }) => {
              const result =
                contactSchema.shape.profilePicture.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0].message;
            },
          }}
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-gray-600">
                Profile Picture:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-72 p-2 border border-gray-300 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        {/* Description Field */}
        <form.Field
          name="description"
          validators={{
            onChange: ({ value }) => {
              const result = contactSchema.shape.description.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0].message;
            },
          }}
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-gray-600">
                Description:
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-72 p-2 border border-gray-300 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        {/* Submit and Reset Buttons */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-2 items-center">
              <button
                disabled={!canSubmit}
                type="submit"
                className={`mx-2 py-1 px-3 text-sm rounded border-blue-500 ${
                  canSubmit
                    ? "bg-white text-blue-500"
                    : "bg-gray-200 text-gray-400 border-gray-400"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="mx-2 py-1 px-3 text-sm bg-white text-blue-500 border-blue-500 rounded"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="mx-2 py-1 px-3 text-sm bg-white text-blue-500 border-blue-500 rounded"
              >
                Close Form
              </button>
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default ContactForm;
