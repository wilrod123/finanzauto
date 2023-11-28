import {makeStyles,shorthands,tokens,Text,Avatar,Button} from "@fluentui/react-components"
import { GridDots24Regular } from '@fluentui/react-icons';
const useStyles = makeStyles({
    navbar:{
        display:"flex",
        position:"fixed",
        top:0,
        left:0,
        right:0,
        backgroundColor:tokens.colorPaletteGreenForeground2,
        height: "48px",
        zIndex:1,
        justifyContent:"space-between",
        alignItems:"center",
        color:"white",
        paddingLeft:"5px"
    },
    actions:{
        display:"flex",
        flexDirection:"row",
        columnGap:"5px",
        paddingRight:"10px"
    }
})

export const NavBar = () =>{

    const styles = useStyles();
    return (
       <div className={styles.navbar}>
        <Text weight="bold">
            Modulo de Consulta y Registro de usuarios del Sistema
        </Text>
        <div className={styles.actions}>
            <Button appearance="transparent" icon={<GridDots24Regular style={{color:"white"}}/>}/>
            <Avatar
                name="Katri Athokas"
                image={{
                src: "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg",
                }}
            />   
        </div>
       </div> 
        
    )
}