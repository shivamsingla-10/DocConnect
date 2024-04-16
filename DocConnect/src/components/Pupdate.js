import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Pupdate(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [paswd, setPasswd] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddr] = useState("");
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const pat = localStorage.getItem('pat')
        const doc = localStorage.getItem('doc')
        if (!pat || doc) {
            navigate('/')
        }
    });

    const collectdata = async () => {
        let temp = JSON.parse(localStorage.getItem('pat'));
        const cuemail = temp.email;

        let result = await fetch(props.deploy + `pupdate`, {
            method: 'POST',
            body: JSON.stringify({ cuemail, name, phone, paswd, gender, address, age, email }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();

        if (result.result) {
            console.log(result)
            alert('Details Updated')
            navigate('/')
        }
        else {
            alert('Some error occurred')
        }
    }

    return (
        <div className='container'>
            <center style={{ margin: "20px", padding: "10px" }}><h1>Update Details</h1></center>
            <p style={{ marginLeft: '20px' }}>Note: Leave the field blank if you don't want to update that field</p>
            <form style={{ margin: "20px", marginTop: '0px', padding: "10px", border: "2px solid grey", borderRadius: "10px" }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>

                <label htmlFor="gender" className="form-label">Gender</label>
                <div className='mb-3'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onClick={() => {
                            setGender('male');
                            console.log(gender);
                        }} />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" onClick={() => {
                            setGender('female');
                            console.log(gender);
                        }} />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="other" value="other" onClick={() => {
                            setGender('other');
                            console.log(gender);
                        }} />
                        <label className="form-check-label" htmlFor="other">Other</label>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="phone" aria-describedby="phoneHelp" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" aria-describedby="ageHelp" value={age} onChange={(e) => {
                            setAge(e.target.value)
                        }} />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => {
                        setAddr(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" value={paswd} onChange={(e) => {
                        setPasswd(e.target.value)
                    }} />
                </div>

                <button type="button" className="btn btn-primary" onClick={collectdata}>Submit</button>
            </form>
        </div>
    )
}

export default Pupdate