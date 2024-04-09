import { Input } from "../../components/FormInputs";

const SignupPageFields: Input[] = [{
    id: 1,
    size:"medium",
    name: "user_email_id",
    type: "text",
    text_type: "string",
    placeholder: "raj_car@gmail.com",
    errorMessage:"Email address should be of minimum 5 characters.",
    label: "Email ID",
    minlen:5,
    maxlen:100,
    pattern: /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    datatestid:'signupemailid',
    required: true,
},{
    id: 4,
    size: "medium",
    name: "user_mobile",
    type: "text",
    text_type: "text",
    placeholder: "919612347132",
    errorMessage:"Mobile number should be of 10 digits",
    label: "Mobile Number",
    pattern: /\d{12}/,
    datatestid: "singupemobileno",
    required: true,
  },
{
    id: 2,
    size:"medium",
    name: "user_password",
    type: "text",
    text_type: "password",
    placeholder: "Password",
    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{10,}$/, //contains 1-special char, capital letter, number and should have minimum 10 characters
    minlen:10,
    maxlen:100,
    errorMessage: "Password should be 10 characters long. Add special characters, number and Capital Letters.",
    label: "Password",
    datatestid:'signuppassword',
    required: true,
},
{
    id: 3,
    size:"medium",
    name: "user_password_confirm",
    type: "text",
    text_type: "password",
    placeholder: "Enter password",
    label: "Confirm Password",
    errorMessage: "Passwords don't match",
    required: true,
    datatestid:'signuppasswordconfirm'
},
]

  export default SignupPageFields;