import { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';

const LabEvents = () => {
  const [value, setValue] = useState();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const onChange = (val, e) => {
    const month = val.getMonth();
    if (month !== activeMonth) {
      setActiveMonth(month);
    }
  };

  const dummyEvents = [
    { text: 'Marketplace Launch', day: '1st' },
    { text: 'Upgrades Available ', day: '12th' },
    { text: 'First AMA 2022 ', day: '20th' },
    { text: 'New Animal Party ', day: '31st' }
  ];

  return (
    <section className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
      <h1 className="text-center text-4xl lg:text-6xl font-bold mb-8">
        ZOO Labs Events
      </h1>
      <div className="flex flex-col md:flex-row lg:justify-center lg:basis-2/3">
        <div className="text-center flex bg-black100 px-4 py-8 rounded flex-col lg:flex-row lg:justify-between mr-4 gap-10">
          {/* <div className="lg:basis-1/2"> */}
          <Calendar
            value={value}
            onChange={onChange}
            nextLabel={null}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
            className="lg:basis-1/2"
            tileClassName={({ view, date }) => {
              console.log('This is the view -> ', view);
              return `md:p-2 ${
                date.getMonth() === activeMonth
                  ? 'text-grey-50'
                  : 'text-grey-80'
              }`;
            }}
          />
          {/* </div> */}
          <div className="lg:basis-1/2">
            <p className="text-grey uppercase text-xl font-bold mb-4">Events</p>
            <div className="border-2 border-white rounded">
              {dummyEvents.map((event, index) => (
                <p
                  style={{
                    padding: '15px 10px',
                    borderBottom:
                      index + 1 !== dummyEvents.length
                        ? '3px solid #fff'
                        : 'none',
                    fontSize: 14,
                    fontWeight: 'normal'
                  }}
                  key={index}
                >
                  {event.text} -{' '}
                  <span style={{ fontWeight: 'bold' }}>{event.day}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-violet-600 text-white px-4 py-8 rounded flex flex-col items-center lg:basis-1/2 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4">Event Information</h2>
          <div className="flex flex-col items-center">
            <p className="bg-orange text-white px-4 py-2 text-center mb-4 inline-block">
              Jan.22.22
            </p>
            <div className="border-2 border-white text-center rounded-sm px-4 py-8">
              <p>Where? zoolabs.io</p>
              <p>
                After much anticipation we are proud to announce the launch of
                the ZOO Market. Now all users can buy, sell, trade and bid on
                all ZOO creatures, including our NFT Animals and our unhatched
                NFT Eggs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabEvents;
