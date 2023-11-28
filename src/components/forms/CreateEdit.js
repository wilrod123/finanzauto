import { useEffect, useReducer, useState } from "react";
import {
  Field,
  Input,
  Dropdown,
  Option,
  Button,
  DrawerBody,
  DrawerFooter,
} from "@fluentui/react-components";
import { API_URL, token } from "../../services/config";

export const CreateEdit = (props) => {
  const { selected = undefined, setOpen = () => {} } = props;

  let initialsValues = {
    title: selected?.title,
    firstName: selected?.firstName,
    lastName: selected?.lastName,
    email: selected?.email,
  };
  const [form, setForm] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialsValues
  );

  const [error, setError] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.firstName || !form.lastName) {
      setError(true);
      return;
    }

    if (selected) {
      await fetch(`${API_URL}/${selected.id}`, {
        method: "PUT",
        body: JSON.stringify({
          email: form.email,
          lastName: form.lastName,
          firstName: form.firstName,
        }),
        headers: { "app-id": token, "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(({ data }) => {
          setOpen(false);
        });
      return;
    }
    await fetch(`${API_URL}/create`, {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        lastName: form.lastName,
        firstName: form.firstName,
      }),
      headers: { "app-id": token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(( data ) => {
        setOpen(false);
      });
  };

  const options = ["ms", "miss", "mr", "mrs"];

  return (
    <>
      <DrawerBody>
        <form action="" id="Form" onSubmit={handleSave}>
          <Field
            required
            label="Titulo"
            validationState={form.title ? "success" : "error"}
            validationMessage={form.title ? "" : "Este Campo es Requerido"}
          >
            <Dropdown
              placeholder={selected && form?.title}
              defaultSelectedOptions={[form.title]}
              onOptionSelect={(_, data) => setForm({ title: data.optionValue })}
            >
              {options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>
          <Field
            required
            label="Nombre"
            validationState={form.firstName ? "success" : "error"}
            validationMessage={form.firstName ? "" : "Este Campo es Requerido"}
          >
            <Input
              required
              value={selected && form?.firstName}
              onChange={(_, data) => setForm({ firstName: data.value })}
            />
          </Field>
          <Field
            required
            label="Apellido"
            validationState={form.lastName ? "success" : "error"}
            validationMessage={form.lastName ? "" : "Este Campo es Requerido"}
          >
            <Input
              value={selected && form?.lastName}
              onChange={(_, data) => setForm({ lastName: data.value })}
              required
            />
          </Field>
          <Field
            required
            label="Correo"
            validationState={form.email ? "success" : "error"}
            validationMessage={form.email ? "" : "Este Campo es Requerido"}
          >
            <Input
              type="email"
              value={selected && form?.email}
              onChange={(_, data) => setForm({ email: data.value })}
              required
            />
          </Field>
          {!Error && "Hay Campos Vacios"}
        </form>
      </DrawerBody>
      <DrawerFooter>
        <Button type="submit" appearance="primary" form="Form">
          Guardar
        </Button>
      </DrawerFooter>
    </>
  );
};
