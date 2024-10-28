import { useNavigate } from "react-router-dom";
import { deleteSeminar } from "../../utils/seminar_api";
import { useState } from "react";

export default function ShortDisplaySeminar({seminar}) {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState('')
    function handleNavigate(id) {
        navigate(`/ChiroSeminars/DisplaySeminar/${id}`);
    }
    function handleDelete(id) {
        setDeleted('none')
        deleteSeminar(id)
    }
    return (
        <div key={seminar.id} style={{display: deleted}}>
            <h4 style={{color: 'red'}}>{seminar.title}</h4>
            <p><strong>Date:</strong> {seminar.date}</p>
            <p><strong>Location:</strong> {seminar.location}</p>
            <p><strong>Price:</strong> {seminar.price}</p>
            <button onClick={() => handleNavigate(seminar.id)}>Visit Seminar</button>
            <button onClick={() => handleDelete(seminar.id)}>Delete Seminar</button>
        </div>
    )
}