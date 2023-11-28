import {
  Card,
  CardHeader,
  makeStyles,
  Button,
  Caption1,
  Persona,
} from "@fluentui/react-components";
import { Edit24Regular, Delete24Regular } from "@fluentui/react-icons";
const useStyles = makeStyles({
  card: {
    marginTop: "5px",
  },
});

export const UserRow = (props) => {
  const { id, firstName, lastName, title, picture, handleDelete, handleEdit } =
    props;
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Persona
            textAlignment="center"
            name={`${title} ${firstName} ${lastName}`}
            presence={{ status: "available" }}
            avatar={{
              image: {
                src: picture,
              },
            }}
          />
        }
        action={
          <>
            <Button
              appearance="transparent"
              onClick={() => handleEdit(id)}
              icon={<Edit24Regular />}
            />
            <Button
              appearance="transparent"
              onClick={() => handleDelete(id)}
              icon={<Delete24Regular />}
            />
          </>
        }
      />
    </Card>
  );
};
