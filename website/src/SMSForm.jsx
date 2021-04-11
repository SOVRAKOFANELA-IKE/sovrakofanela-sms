import React, {useState} from 'react';

const SMSForm = () => {
    const date = new Date();
    const defaultTo = '+30';
    const defaultBody = `SOVRAKOFANELA IKE ΜΟΥΡΟΥΖΗ 3 ΑΦΜ: 801405200 ΤΗΛ: 2610453020 ΩΡΑ: ${date.getHours()}:${date.getMinutes()}`
    const [message, setMessage] = useState({to: defaultTo, body: defaultBody})
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true)
        fetch('http://localhost:3001/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setError(false)
                    setSubmitting(false)
                    setMessage({body: defaultBody, to: defaultTo})
                } else {
                    setError(true)
                    setSubmitting(false)
                }
            });
    }

    const onHandleChange = (event) => {
        const name = event.target.getAttribute('name');
        setMessage({...message, [name]: event.target.value})
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                className={error ? 'error sms-form' : 'sms-form'}
            >
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="tel"
                        name="to"
                        id="to"
                        value={message.to}
                        onChange={onHandleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        name="body"
                        id="body"
                        value={message.body}
                        onChange={onHandleChange}
                        rows='6'
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Περιμένετε..." : "Αποστολή μηνύματος"}
                </button>
            </form>
        </>
    )
}

export default SMSForm;
