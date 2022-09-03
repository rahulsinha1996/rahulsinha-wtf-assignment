import React from 'react';
import styles from "./Signup.module.css"

export const Signup = () => {
  return (
    <div className={styles.main}>
      
        <div className={styles.formLarge}>
        
        <div>
        <h1 style={{display:"block"}}>Sign Up</h1>
        <div className={styles.inputForm}>
              
                <div>
                    <input className={styles.emailInput} placeholder='Enter Fullname' type='text' />
                    <input className={styles.passwordInput} placeholder='Mobile Number' type='text'/>
                </div>
            </div> 
        </div>
        
           <div>
           <div className={styles.inputForm}>
                <div>
                  <input className={styles.emailInput} placeholder='Email Id' type='text' />
                  <input className={styles.passwordInput} placeholder='Referal Code (optional)' type='text'/>
                  <div>
                <div className={styles.loginBtn}>Send OTP </div>
                </div>
                </div>
            </div>
            <div style={{display:"block", marginTop:"10px"}}>Already have an account <a style={{textDecoration:"none", color:"red"}} href='/'>Login</a> </div> 
           </div>
            
            
        </div>
       
    </div>
)
}
