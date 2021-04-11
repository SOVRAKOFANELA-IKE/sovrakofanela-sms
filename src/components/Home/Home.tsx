import {useState} from 'react';

const Home = () => {
    const date = new Date();
    const defaultTo = '+30';
    const defaultBody = `SOVRAKOFANELA IKE ΜΟΥΡΟΥΖΗ 3 ΑΦΜ: 801405200 ΤΗΛ: 2610453020 ΩΡΑ: ${date.getHours()}:${date.getMinutes()}`
    const [message, setMessage] = useState({to: defaultTo, body: defaultBody})
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [locked, setLocked] = useState(true)

    const onSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true)
        fetch('/api/messages', {
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
                console.log(data)
            });
    }

    const onHandleChange = (event) => {
        const name = event.target.getAttribute('name');
        setMessage({...message, [name]: event.target.value})
    }

    const onHandleLock = (event) => {
        if (event.target.value === 'h123ha123') {
            setLocked(false)
        }
    }

    return (
        <div className="App">
            {locked ? (
                <header className='App-header'>
                    <input onChange={onHandleLock} type='password' placeholder='Κωδικός Πρόσβασης' name='password' id='password'/>
                </header>
            ) : (
                <header className="App-header">
                    <img src='/logo.svg' className="App-logo" alt="logo"/>
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
                                rows={6}
                            />
                        </div>
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Περιμένετε..." : "Αποστολή μηνύματος"}
                        </button>
                    </form>
                </header>
            )}
        </div>
    )
}

export default Home;
