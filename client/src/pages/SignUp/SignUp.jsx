import React, { useContext, useState } from 'react'
import "./SignUp.css"
import Logo from "../../assets/images/logo.png";
import CustomTextBox from '../../components/CustomTextBox/CustomTextBox'
import CustomButton from '../../components/CustomButton/CustomButton'
import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const { register, registerError, setRegisterError } = useContext(AppContext);

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const validateFormData = (name, value) => {

        let msg = '';

        if (name == "firstName" && !value.trim()) {
            msg = 'First name is required';

        } else if (name == "lastName" && !value.trim()) {
            msg = 'Last name is required';

        } else if (name == "email") {

            if (!value.trim()) {
                msg = "Email is required";
            }

            else if (!/\S+@\S+\.\S+/.test(value)) {
                msg = "Email is invalid";
            }


        } else if (name == "phone") {
            if (!value.trim()) {
                msg = 'Phone number is required';
            } else if (!/^\d{10}$/.test(value)) {
                msg = 'Phone number is invalid';
            }
        } else if (name == "password") {
            if (!value.trim()) {
                msg = "Password is required";
            } else if (value.length < 6) {
                msg = "Password should be containt at least 6 charactors"
            }

        } else if (name == "confirmPassword") {
            if (!value.trim()) {
                msg = "Confirm password is required"
            } else if (registerData.password != value) {
                msg = "The password does not match"
            }
        }


        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: msg
        }));
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        validateFormData(name, value);

    }

    const onSubmit = async () => {

        setRegisterError(null);
        await register(registerData);
        

    }

    return (
        <>
            <div class="flex items-center justify-center min-h-screen bg-gray-100">
                <div class="mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-6/12">
                    <div class="py-20 px-12">
                        <img src={Logo} alt="" width={100} srcset="" className='mx-auto' />
                        <h2 class="text-xl font-medium">Register</h2>
                        <div className='flex space-x-4'>
                            <div className='w-full'>
                                <CustomTextBox label={"Your name"} name="firstName" value={registerData.firstName} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold'>{errors.firstName}</p>
                                <CustomTextBox label={"Email"} name="email" value={registerData.email} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold'>{errors.email}</p>
                                <CustomTextBox label={"Password"} name="password" value={registerData.password} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold'>{errors.password}</p>
                            </div>
                            <div className='w-full'>
                                <CustomTextBox label={"Last name"} name="lastName" value={registerData.lastName} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold'>{errors.lastName}</p>
                                <CustomTextBox label={"Phone number"} name="phone" value={registerData.phone} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold'>{errors.phone}</p>
                                <CustomTextBox label={"Confirm Password"} name="confirmPassword" value={registerData.confirmPassword} onChangeInput={handleInputChange} />
                                <p className='text-xs text-[#fe578c] font-semibold mb-3'>{errors.confirmPassword}</p>
                            </div>
                        </div>

                         {
                            registerError && <p className='text-xs text-[#fe578c] font-semibold mb-3'>{registerError.length > 10 ? "Please fill the invalid inputs" : registerError }</p>
                         } 


                        <div className='w-44'>
                            <CustomButton onClick={onSubmit} text={"CREATE ACCOUNT"} isRoundedFull={false} />
                        </div>

                        <p className='text-xs text-center mt-2 me-2'>Already have an account? 

                            <Link to={"/"}>
                            <a className='text-[#fe578c]' href="">Login</a> 
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp