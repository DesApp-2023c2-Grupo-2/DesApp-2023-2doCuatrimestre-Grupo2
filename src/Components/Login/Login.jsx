import * as React from "react";
import { useForm } from "react-hook-form";
import { Grid, Box, Button, TextField } from "@mui/material";
import { getUsuario } from "../../Services/getUsuarioService";
import { formValidate } from "../../utils/formValidator";
import logo_universidad from "../Image/logo-universidad.png";
import "./login.css";
import { useNavigate } from 'react-router-dom'; 
import { userContext } from "../../Context/LabProvider";
import FormError from "../Mensajes/FormError";
import { useState } from "react";

export default function Login() {
  const {setUser} = React.useContext(userContext)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { required, minLength, validateTrim } = formValidate();
  const {register, handleSubmit, formState: { errors }} = useForm({
    //BORRAR
    defaultValues: {
      user: "Admin01",
      password: "123123",
    //   user: "",
    //   password: "",
    },
  });

  const onSubmit = async ({ user, password }) => {
    try {
        const hashPass = btoa(password)
        const value = await getUsuario(user, hashPass);
        if(value) {    
            localStorage.setItem('usuario', JSON.stringify(value))
            setUser(value || JSON.parse(localStorage.getItem('usuario')))
            const rol = value.rol
            if(rol === "docente") navigate("/Docente/Pedidos");
            else if (rol === "lab") navigate("/Laboratorio/Pedidos")
            else navigate("/login")            
        }else{
          throw new Error
        }
    } catch (error) {
        setError({error: true ,message: 'Usuario o Contraseña incorrectos'})
    }
  };

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Box className="container-login">
            <img src={logo_universidad} alt="logo-universidad" />
          </Box>
          <Box className="containter-form-login">
            <Box>
              <p className="title-login">Ingreso</p>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="container-input">
              <TextField 
                  variant="filled"
                  error={errors.user ? true : false}
                  sx={{ borderBottom: !errors.user ? 'solid': 'none', input: { color: 'white' } }}
                  className="input-login"
                  type="text"
                  label="Usuario"
                  InputLabelProps={{
                    style: {
                      color: 'white'
                    } }} 
                  {...register("user", {
                    required,
                  })}
                />
                <FormError error={errors.user}/>
              </Box>
              <Box>
                <TextField 
                  variant="filled"
                  error={errors.password ? true : false}
                  sx={{borderBottom: !errors.password ? 'solid': 'none', input: { color: 'white' }}}
                  className="input-login"
                  type="password"
                  label="Contraseña"
                  autocomplete="on"
                  InputLabelProps={{
                    style: {
                      // textOverflow: 'ellipsis',
                      // whiteSpace: 'nowrap',
                      // overflow: 'hidden',
                      // width: '100%',
                      color: 'white'
                    } }} 
                  {...register("password", {
                    minLength,
                    validate: validateTrim,
                  })}
                />
                <FormError error={errors.password}/>
              </Box>
              <Button className="button-login" type="submit">
                Login
              </Button>
               <FormError error={error}/>
            </form>
          </Box>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
      </Grid>
    </Box>
  );
}
