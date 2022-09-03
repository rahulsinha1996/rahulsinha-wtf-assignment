import React, { useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export const Login = () => {
    const [show, setShow]=useState(false)
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const navigate=useNavigate()


    const handleLogin=()=>{
        if(username!=='' && password!=='')
        {   
            const payload={
                username,
                password
            }
            axios({
                method:"POST",
                url:"https://devapi.wtfup.me/user/login",
                data:payload
            }).then((res)=>{
                if(res.status==200)
                {
                    navigate("/profile")
                }
            })
        }
        
        
    }
    return (
        <div className={styles.main}>
            <div className={styles.formLarge}>
                <h1>Welcome Back</h1>
                {show ? <div className={styles.inputForm}>
                    <div>
                        <input className={styles.emailInput} placeholder='Enter Email' type='text' onChange={(e)=>setUsername(e.target.value)} />
                        <input className={styles.passwordInput} placeholder='Enter Password' type='text' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                    <div className={styles.loginBtn} onClick={handleLogin}>Login</div>
                    </div>
                </div> : <div className={styles.inputForm}>
                    <div>
                        <input className={styles.emailInput} placeholder='Enter Phone' type='text' />
                    </div>
                    <div>
                    <div className={styles.loginBtn}>Send OTP </div>
                    </div>
                </div>}
                
                
                <div className={styles.toggleBtn}>
                <div className={styles.btnToggle} onClick={()=>setShow(!show)}>{show ? 'Login with Phone' : 'Login with Email'}</div>
                </div>
                <div style={{display:"block", marginTop:"10px"}}>Don't have an account <a style={{textDecoration:"none", color:"red"}} href="/signup">Signup</a>  </div>
            </div>
           
        <div>
            <div>
            <img style={{height:"500px", width:"550px"}} src='https://raw.githubusercontent.com/rahulsinha1996/images/main/resources/img1.png'/>
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <img style={{height:"40px", width:"150px"}} src='https://raw.githubusercontent.com/rahulsinha1996/images/main/resources/appStore.png'/>
            <img style={{height:"40px", width:"150px"}} src='https://raw.githubusercontent.com/rahulsinha1996/images/main/resources/playStore.png'/>
            </div>

        </div>
        
        </div>
        
    )
}
