import { useState, useCallback } from "react";
import Calendar from "react-calendar";
import data from "../../data/events.json";

const LabEvents = () => {
  const formatDate = (date) => {
    const ndate = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${ndate}`;
  };

  const [value, setValue] = useState(formatDate(new Date()));
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState<typeof data[0] | undefined>(data[0]);

  const onChange = (date) => {
    setDate(date);
    setActiveMonth(date.getMonth());
  };

  const onChangeDay = (val, e) => {
    setValue(val);
    const s = data.filter((item) => item.date === val)[0];
    setSelected(s);
  };

  const dummyEvents = [
    { text: "Marketplace Launch", day: "1st" },
    { text: "Upgrades Available ", day: "12th" },
    { text: "First AMA 2022 ", day: "20th" },
    { text: "New Animal Party ", day: "31st" },
  ];

  const mini = data?.slice(0, 4);

  const formatMonth = (date) => {
    const month = date?.split("-")[1];
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
    }
  };

  const formatDay = (date) => {
    const day = String(date).split("-")[2];
    if (Number(day) === 1) {
      return `${Number(day)}st`;
    }
    if (Number(day) === 2) {
      return `${Number(day)}nd`;
    }
    if (Number(day) === 3) {
      return `${Number(day)}rd`;
    }
    return `${Number(day)}th`;
  };

  return (
    <section className="pt-24 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
      <h1 className="text-center text-4xl lg:text-6xl font-bold mb-8 mt-16">
        ZOO Labs Events
      </h1>
      <div className="flex flex-col md:flex-row lg:justify-center lg:basis-2/3 lg:mb-16">
        <div className="text-center flex bg-black100 px-4 py-8 rounded flex-col lg:flex-row lg:justify-between mr-4 gap-10">
          <Calendar
            onChange={onChange}
            value={date}
            isMultiSelection={true}
            // value={value}
            // onChange={onChange}
            // nextLabel={null}
            // prevLabel={null}
            // next2Label={null}
            // prev2Label={null}
            // defaultValue={new Date(2022, 1, 1)}
            // className="lg:basis-1/2"
            // tileClassName={({ view, date }) => {
            //   console.log('This is the view -> ', view);
            //   return `md:p-2 ${
            //     date.getMonth() === activeMonth
            //       ? 'text-grey-50'
            //       : 'text-grey-80'
            //   }`;
            // }}

            /*
            border: 2px solid;

border-image-source: linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%);


            */
            onClickDay={(val, e) => onChangeDay(formatDate(val), e)}
            nextLabel={null}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
            className="lg:basis-1/2"
            tileClassName={({ view, date }) => {
              return `md:p-2 ${data.map(
                (d) => d.date === formatDate(date) && " border-b border-gre"
              )} ${
                date.getMonth() === activeMonth
                  ? "text-grey-50"
                  : "text-grey-80"
              }`;
            }}
          />
          <div className="lg:basis-1/2">
            <p className="text-grey uppercase text-xl font-bold mb-4">Events</p>
            <div className="border-2 border-white rounded">
              {mini.map((event, index) => (
                <p
                  style={{
                    padding: "15px 10px",
                    borderBottom:
                      index + 1 !== mini.length ? "3px solid #fff" : "none",
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                  key={event?.id}
                >
                  {event.title} -{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {formatDay(event.date)}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-violet-600 text-white px-4 py-8 rounded flex flex-col items-center lg:basis-1/2 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4">Event Information</h2>
          <div className="flex flex-col items-center">
            <p className="bg-orange text-white px-4 py-2 text-center mb-4 inline-block">
              {`${formatMonth(value)}.${value.split("-")[2]}.${value
                .split("-")[0]
                ?.slice(2)}`}
            </p>
            <div className="border-2 border-white text-center rounded-sm px-4 py-8">
              {selected && <p>Where? {selected.location}</p>}
              <p>
                {selected
                  ? selected.description
                  : "No event scheduled for this day"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabEvents;
