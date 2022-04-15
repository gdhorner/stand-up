import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function Setup() {
  const [error, setError] = useState('');
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const fHours = useRef();
  const fMinutes = useRef();
  const wHours = useRef();
  const wMinutes = useRef();
  const tHours = useRef();
  const { currentUser } = useAuth();

  const hours = [
    { key: 'totalhr', label: '0', value: 0 },
    { key: 'totalhr', label: '1', value: 1 },
    { key: 'totalhr', label: '2', value: 2 },
    { key: 'totalhr', label: '3', value: 3 },
    { key: 'totalhr', label: '4', value: 4 },
    { key: 'totalhr', label: '5', value: 5 },
    { key: 'totalhr', label: '6', value: 6 },
    { key: 'totalhr', label: '7', value: 7 },
    { key: 'totalhr', label: '8', value: 8 },
  ];

  const minutes = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 },
    { label: '24', value: 24 },
    { label: '25', value: 25 },
    { label: '26', value: 26 },
    { label: '27', value: 27 },
    { label: '28', value: 28 },
    { label: '29', value: 29 },
    { label: '30', value: 30 },
    { label: '31', value: 31 },
    { label: '32', value: 32 },
    { label: '33', value: 33 },
    { label: '34', value: 34 },
    { label: '35', value: 35 },
    { label: '36', value: 36 },
    { label: '37', value: 37 },
    { label: '38', value: 38 },
    { label: '39', value: 39 },
    { label: '40', value: 40 },
    { label: '41', value: 41 },
    { label: '42', value: 42 },
    { label: '43', value: 43 },
    { label: '44', value: 44 },
    { label: '45', value: 45 },
    { label: '46', value: 46 },
    { label: '47', value: 47 },
    { label: '48', value: 48 },
    { label: '49', value: 49 },
    { label: '50', value: 50 },
    { label: '51', value: 51 },
    { label: '52', value: 52 },
    { label: '53', value: 53 },
    { label: '54', value: 54 },
    { label: '55', value: 55 },
    { label: '56', value: 56 },
    { label: '57', value: 57 },
    { label: '58', value: 58 },
    { label: '59', value: 59 },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    //setLoading(true);
    const times = await confirm();
    const timedSecs = calculatefSeconds()
    const waitingSecs = calculateWSeconds()
    const totalHours = tHours.current.value
    history('/Timer', { state: { timedSecs: timedSecs, waitingSecs: waitingSecs, totalHours: totalHours } });

    //setLoading(false);
  }

  async function confirm() {
    const times = [
      {key: fHours, value:fHours.current.value},
      {key: fMinutes, value:fMinutes.current.value},
      {key: wHours, value:wHours.current.value},
      {key: wMinutes, value:wMinutes.current.value},
      {key: tHours, value:tHours.current.value},]


    await setDoc(doc(db, 'users', currentUser.uid), {
      fHours: fHours.current.value,
      fMinutes: fMinutes.current.value,
      wHours: wHours.current.value,
      wMinutes: wMinutes.current.value,
      tHours: tHours.current.value,
    });
    
    return times
  }

  function calculatefSeconds(){
    const timedSecs = fHours.current.value * 3600 + fMinutes.current.value * 60;
    return timedSecs;
  }

  function calculateWSeconds(){
    const waitingSecs = wHours.current.value * 3600 + wMinutes.current.value * 60;
    return waitingSecs;
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Stand Up</h2>
            <h4>
              <strong>How many hours will you be working?</strong>
            </h4>
            <Form.Group>
              <Form.Label>Hour(s)</Form.Label>
              <Form.Select ref={tHours} required>
                {hours.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <h4>
              <strong>
                How often would you like to stand for how long? Stand for:
              </strong>
            </h4>
            <Form.Group>
              <Form.Label>Hour(s)</Form.Label>
              <Form.Select ref={fHours} required>
                {hours.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Minute(s)</Form.Label>
              <Form.Select ref={fMinutes} required>
                {minutes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            Every:
            <Form.Group>
              <Form.Label>hour(s)</Form.Label>
              <Form.Select ref={wHours} required>
                {hours.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Minute(s)</Form.Label>
              <Form.Select ref={wMinutes} required>
                {minutes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Confirm
            </Button>
          </Form>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
