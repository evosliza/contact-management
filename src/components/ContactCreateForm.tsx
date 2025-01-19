import { z } from "zod";
import { FieldApi, useForm } from "@tanstack/react-form";
import { Contact } from "../types";
import { FC } from "react";
import { addContact } from "../api/contacts";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userName: z.string().min(1, "Username is required"),
  profilePicture: z.string().url("Invalid URL"),
  description: z.string().min(1, "Description is required"),
});

interface ContactCreateFormProps {
  onFormClose: (newContact: Contact) => void;
  contact?: Contact | null;
}

const ContactCreateForm: FC<ContactCreateFormProps> = ({
  onFormClose,
  contact,
}) => {
  const form = useForm({
    defaultValues: {
      name: contact ? contact.name : "",
      userName: contact ? contact.userName : "",
      profilePicture: contact ? contact.profilePicture : "",
      description: contact ? contact.description : "",
    } as Partial<Contact>,
    onSubmit: async ({ value }) => {
      const newContact = await addContact(value);
      onFormClose(newContact);
      form.reset();
    },
  });

  const handleReset = () => {
    form.reset();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-full w-full"
    >
      <div className="p-2 bg-white flex flex-col h-full w-full gap-2 items-center">
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A name is required"
                  : value.length < 3
                    ? "Name must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return value?.includes("error") && 'No "error" allowed in name';
              },
            }}
            children={(field) => {
              return (
                <div className="flex flex-col gap-2 text-black">
                  <label htmlFor={field.name} className="text-gray-600 ">
                    Name:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="
                      flex-grow
                      p-2
                      border
                      border-gray-300
                      rounded
                      bg-white
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      text-gray-600
                      "
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="userName"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-gray-600 ">
                  UserName:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="
                      flex-grow
                      p-2
                      border
                      border-gray-300
                      rounded
                      bg-white
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      text-gray-600
                      "
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="profilePicture"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-gray-600 ">
                  Profile Picture:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="
                      flex-grow
                      p-2
                      border
                      border-gray-300
                      rounded
                      bg-white
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      text-gray-600
                      "
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>

        <div>
          <form.Field
            name="description"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-gray-600 ">
                  Description:
                </label>
                <input
                  type="textarea"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="
                      flex-grow
                      p-2
                      border
                      border-gray-300
                      rounded
                      bg-white
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      text-gray-600
                      "
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-2 items-center">
              <button
                type="submit"
                className="mx-2 p-2 bg-white text-blue-500 border-blue-500 rounded"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="mx-2 p-2 bg-white text-blue-500 border-blue-500 rounded"
              >
                Reset
              </button>
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default ContactCreateForm;
