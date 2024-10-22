import React from 'react'
import "./CustomTextBox.css"

const CustomTextBox = ({label,type,name,value,onChangeInput}) => {
    return (
        <div class="relative float-label-input">
            <input type={type} id="name" name={name} value={value} placeholder=" " onChange={onChangeInput} class="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400" />
            <label for="name" class="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">{label}</label>
        </div>
    )
}

export default CustomTextBox