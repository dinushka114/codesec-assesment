import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import CustomTextBox from '../../components/CustomTextBox/CustomTextBox'
import Logo from "../../assets/images/logo.png"
import CustomButton from '../../components/CustomButton/CustomButton'
import AppContext from '../../AppContext'


const SignIn = () => {

  const { login, loginError } = useContext(AppContext);

  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({});

  const validateFormData = (name, value) => {

    let msg = '';

    if (name == "email") {

      if (!value.trim()) {
        msg = "Email is required";
      }

      else if (!/\S+@\S+\.\S+/.test(value)) {
        msg = "Email is invalid";
      }

    } else if (name == "password" && !value.trim()) {
      msg = 'Password is required';

    }


    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: msg
    }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateFormData(name, value);

  }

  const onSubmit = async () => {
    await login(authData.email, authData.password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-96">
        <div className="py-20 px-12">
          <img src={Logo} width={100} className='mx-auto' />
          <h2 className="text-xl font-medium">Login </h2>
          <CustomTextBox label={"Email address"} type={"email"} name="email" value={authData.email} onChangeInput={handleInputChange} />
          <p className='text-xs text-[#fe578c] font-semibold'>{errors.email}</p>
          <CustomTextBox label={"Password"} type={"password"} name={"password"} value={authData.password} onChangeInput={handleInputChange} />
          <p className='text-xs text-[#fe578c] font-semibold mb-3'>{errors.password}</p>
          <CustomButton text={"SIGN IN"} isRoundedFull={false} onClick={onSubmit} />
          {
            loginError && <p className='text-xs text-[#fe578c] font-semibold mt-3 text-center'>{loginError}</p>
          }

          <p className='text-xs text-center mt-2 me-2'>Don't have an account?

            <Link to={"/signup"}>
              <a className='text-[#fe578c]' href="">Create an account</a>
            </Link>
          </p>

        </div>
      </div>
    </div>

  )
}

export default SignIn