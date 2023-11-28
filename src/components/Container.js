import {
  makeStyles,
  shorthands,
  Input,
  Button,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import { Search24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { useState, useEffect, useMemo } from "react";
import { API_URL, token } from "../services/config";
import { UserRow } from "./UserRow";
import { CreateEdit } from "./forms/CreateEdit";

const useStyles = makeStyles({
  container: {
    ...shorthands.margin("100px", "50px", "5px", "50px"),
  },
  toolbar: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    columnGap: "5px",
    top: 100,
  },
});

export const Container = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  const handleListUsers = async () => {
    await fetch(API_URL, { method: "GET", headers: { "app-id": token } })
      .then((response) => response.json())
      .then(({ data }) => setData(data));
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "app-id": token },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        alert("eliminado");
        handleListUsers();
      });
  };

  const handleEdit = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "app-id": token },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelected(data);
        setOpen(true);
      });
  };

  const elements = useMemo(() => {
    if (!query) return data;
    return data.filter(
      ({ title, firstName, lastName }) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        firstName.toLowerCase().includes(query.toLowerCase()) ||
        lastName.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, data]);

  useEffect(() => {
    if (!open) {
      handleListUsers();
    }
  }, [open]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <Input
            contentBefore={<Search24Regular />}
            onChange={(_, data) => setQuery(data.value)}
          />
          <Button appearance="primary" onClick={() => 
            {
              setSelected(undefined);
              setOpen(true)
            }}>
            Crear Usuario
          </Button>
        </div>
        {elements.length === 0
          ? " no hat elementos"
          : elements.map((props) => (
              <UserRow
                key={props.id}
                {...props}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
      </div>

      <OverlayDrawer
        position="end"
        open={open}
        onOpenChange={(_, { open }) => setOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Crear Usuario
          </DrawerHeaderTitle>
        </DrawerHeader>
        <CreateEdit selected={selected} setOpen={setOpen} />
      </OverlayDrawer>
    </>
  );
};
