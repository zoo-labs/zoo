import { useState, useCallback } from "react";
import Calendar from "react-calendar";
import Image from "next/image";

const LabEvent = () => {
  const [value, setValue] = useState();
  // const onChange = (date: Date) => {
  //   console.log(date);
  // };
  const onChange = () => {
    console.log(value);
  };

  const dummyEvents = [
    { text: "Marketplace Launch", day: "1st" },
    { text: "Upgrades Available ", day: "12th" },
    { text: "First AMA 2022 ", day: "20th" },
    { text: "New Animal Party ", day: "31st" },
  ];
  return (
    <>
      <div style={{ marginTop: 174, margin: "174px 90px 0px 90px" }}>
        <p style={{ fontSize: 48, fontWeight: "bold" }}>ZOO Labs Events</p>
        <div style={{ marginTop: 77, display: "flex", gap: 30 }}>
          <div
            style={{
              width: "65%",
              borderRadius: 12,
              background: "#161420",
              marginRight: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                padding: "10px 10px",
              }}
            >
              <div
                style={{
                  width: "60%",
                  textAlign: "center",
                }}
              >
                <Calendar value={value} onChange={onChange} />
              </div>
              <div style={{ width: "40%" }}>
                <p style={{ color: "#7C7C7C", marginBottom: 10 }}>EVENTS</p>
                <div style={{ border: "3px solid #FFFFFF", borderRadius: 12 }}>
                  {dummyEvents.map((event, index) => (
                    <p
                      style={{
                        padding: "15px 10px",
                        borderBottom:
                          index + 1 !== dummyEvents.length
                            ? "3px solid #fff"
                            : "none",
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                      key={index}
                    >
                      {event.text} -{" "}
                      <span style={{ fontWeight: "bold" }}>{event.day}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "35%",
              borderRadius: 12,
              background: "#9757D7",
              padding: "19px 30px",
            }}
          >
            <p
              style={{
                width: "50%",
                fontSize: 36,
                fontWeight: 900,
                marginBottom: 13,
              }}
            >
              EVENT Information
            </p>
            <div
              style={{
                border: "3px solid #fff",
                borderRadius: 12,
                padding: "9px 16px",
                fontSize: "12px",
              }}
            >
              <p style={{ fontSize: 12, marginBottom: 12 }}>
                {" "}
                What? Marketplace Launch{" "}
              </p>
              <p
                style={{
                  background: "orange",
                  display: "inline",
                  fontSize: 14,
                }}
              >
                Jan . 22 . 22
              </p>
              <p style={{ fontSize: 12, marginTop: 12, marginBottom: 12 }}>
                Where? zoolabs.io
              </p>
              <p style={{ fontSize: 12 }}>
                After much anticipation we are proud to announce the launch of
                the ZOO Market. Now all users can buy, sell, trade and bid on
                all ZOO creatures, including our NFT Animals and our unhatched
                NFT Eggs. Don’t miss out, add it to your calendar here!
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: "70px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ marginBottom: 22 }}> Connect with us!</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Image src="/img/twitter.svg" alt="" width={20} height={20} />
            <Image src="/img/telegram.svg" alt="" width={20} height={20} />
            <Image src="/img/instagram.svg" alt="" width={20} height={20} />
            <Image src="/img/youtube.svg" alt="" width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LabEvent;
