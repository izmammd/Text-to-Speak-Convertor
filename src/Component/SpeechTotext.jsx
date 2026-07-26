import { useEffect, useState } from "react";
// import { useSpeechSynthesis } from "react-speech-kit";

export default function SpeechTotext() {

    const [input, setInput] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoices, setSelectedvoices] = useState(null);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();

            setVoices(availableVoices);
            setSelectedvoices(availableVoices[0])
        };

        loadVoices();

        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const speak = () => {
        const speech = new SpeechSynthesisUtterance(input);
        speak.voices = selectedVoices;
        window.speechSynthesis.speak(speech);
    }


    return (<>

        <div className="container my-5">

            <div className="card shadow-lg border-primary">
                <div className="card-header bg-primary text-white text-center">

                    <h1 className="fw-bold display-6" >Text To Speech Converter</h1>
                </div>

                <div className="card-body p-4">
                    <div className="row justify-content-center">

                        <label className="form-label fw-bold">Enter Text</label>

                        <textarea className="form-control shadow-sm mb-4" onChange={(e) => setInput(e.target.value)} rows="8" value={input} placeholder="Enter text here....."></textarea>

                        <label className="form-label fw-bold">select Voice</label>

                        <select className="form-select shadow-sm mb-4" onChange={(e) => setSelectedvoices(voices[e.target.value])}>
                            {
                                voices.map((voice, i) => (
                                    <option key={i} value={i}>
                                        {voice.name} {voice.lang}
                                    </option>
                                ))
                            }
                        </select>

                        <div className="text-center">
                            <button className="btn btn-warning btn-lg px-5 shadow" onClick={speak}>Speak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* <h1 className="text-center text-white fw-bold display-5 my-3">Text to Speech Convertor</h1>

            <div className="row">
                <div className="col-md-6 align-items-center m-auto">
                    <textarea className="mb-4" rows="8" cols="60" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Text......"></textarea>

                    <select className="form-select mb-4"
                        onChange={(e) => setSelectedvoices(voices[e.target.value])}>
                        {
                            voices.map((voice, i) => (
                                <option className="" key={i} value={i}>{voice.name} {voice.lang}</option>
                            ))
                        }
                    </select>

                    <button className="btn btn-danger mb-4" onClick={speak}>Speak</button>
                </div>
            </div> */}

    </>)
}