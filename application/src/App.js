import React, { useState } from 'react';
import './App.css';

const BusUI = () => {
  
  const Rows = 10;
  const seatsRow = 4;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const handleSeatClick = (rowIndex, seatIndex) => {
    setSelectedSeat({ rowIndex, seatIndex });
    setIsFormVisible(true);
  };
  const handleBooked = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookedSeat = {
      rowIndex: selectedSeat.rowIndex,
      seatIndex: selectedSeat.seatIndex,
      name: formData.get('name'),
      age: formData.get('age'),
      gender: formData.get('gender'),
    };
    setBookedSeats([...bookedSeats, bookedSeat]);
    setSelectedSeat(null);
    setIsFormVisible(false);
  };
  const handleCloseForm = () => {
    setSelectedSeat(null);
    setIsFormVisible(false);
  };
  const renderSeatForm = () => {
    if (isFormVisible && selectedSeat !== null) {
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Book Seat {selectedSeat.rowIndex * seatsRow + selectedSeat.seatIndex + 1}</h2>
            <form onSubmit={handleBooked}>
              <label>Name:</label>
              <input type="text" name="name" required />

              <label>Age:</label>
              <input type="number" name="age" required />

              <label>Gender:</label>
              <select name="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="btn-1">
                <button type="submit">Book</button>
                <button onClick={handleCloseForm}>Close</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return null;
  };
  const isSeatBooked = (rowIndex, seatIndex) => {
    return bookedSeats.some(
      (seat) => seat.rowIndex === rowIndex && seat.seatIndex === seatIndex
    );
  };
  const seats = () => {
    return Array.from({ length: Rows }, (_, rowIndex) => (
      <div key={rowIndex} className="row">
        {Array.from({ length: seatsRow }, (_, seatIndex) => {
          const seatNumber = rowIndex * seatsRow + seatIndex + 1;
          const isSeatSelected = selectedSeat &&
            selectedSeat.rowIndex === rowIndex &&
            selectedSeat.seatIndex === seatIndex;
          const isSeatAlreadyBooked = isSeatBooked(rowIndex, seatIndex);
          return (
            <div
              key={seatIndex}
              className={`seat ${isSeatAlreadyBooked ? 'booked' : 'vacant'
                } ${isSeatSelected ? 'selected' : ''}`}
              onClick={() => {
                if (!isSeatAlreadyBooked) {
                  handleSeatClick(rowIndex, seatIndex);
                }
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
    )); 
  };
  
  return (
    <div>
      <h1>Bus Seating Arrangement</h1>
      <div className="bus">
        {seats()}
        {renderSeatForm()}
      </div>
    </div>
  );
};
export default BusUI;
