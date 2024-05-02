import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState(0);
  const [selected, setSelected] = useState(0);
  let tpp = 0;
  let totalpp = 0;

  if (bill > 0 && Number(tip) > 0 && people > 0) {
    tpp = ((Number(tip) / 100) * bill) / people;
    totalpp = bill / people + tpp;
  }
  function handleReset() {
    setBill(0);
    setTip(0);
    setPeople(0);
    const button = selected;
    button.classList.remove("bg-strong_cyan");
    button.classList.add("bg-very_dark_cyan");
    setSelected(0);
  }
  return (
    <div
      id="total"
      className="bg-light_grayish_cyan h-screen w-screen  flex flex-col items-center "
    >
      <div className="mt-14">
        <img src="/images/logo.svg" alt="" className="" />
      </div>
      <div className=" border  bg-white md:w-10/12 w-screen  flex flex-col md:space-y-0 space-y-8 md:flex-row mt-14 curve p-4 md:space-x-4 md:rounded-3xl md:shadow-2xl">
        <BillForm
          bill={bill}
          setBill={setBill}
          tip={tip}
          setTip={setTip}
          setPeople={setPeople}
          people={people}
          selected={selected}
          setSelected={setSelected}
        />
        <BillDisplay tip={tpp} total={totalpp} onReset={handleReset} />
      </div>
    </div>
  );
}

function BillForm({
  onSubmit,
  bill,
  tip,
  people,
  setBill,
  setTip,
  setPeople,
  selected,
  setSelected,
}) {
  function handleTipSelection(event) {
    if (selected === event.target) {
      event.target.classList.remove("bg-strong_cyan");
      event.target.classList.add("bg-very_dark_cyan");
      setSelected(0);

      // event.target.classList.toggle("very_dark_cyan");
    } else if (selected !== 0 && event.target !== selected) {
      let button = selected;
      button.classList.remove("bg-strong_cyan");
      button.classList.add("bg-very_dark_cyan");
      event.target.classList.remove("bg-very_dark_cyan");
      event.target.classList.add("bg-strong_cyan");
      setSelected((selected) => (selected = event.target));
      console.log(7);
    } else {
      event.target.classList.remove("bg-very_dark_cyan");
      event.target.classList.add("bg-strong_cyan");
      setSelected((selected) => (selected = event.target));
    }

    setTip(event.target.value);
  }
  return (
    <form action="" className="flex flex-col">
      <Entry
        label={"Bill"}
        icon={"/images/icon-dollar.svg"}
        bill={bill}
        setBill={setBill}
      />
      <input
        type="hidden"
        name=""
        id="tip"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
      />
      <TipDisplay onClick={handleTipSelection} />
      <Entry2
        label={"Number of people"}
        icon={"/images/icon-person.svg"}
        people={people}
        setPeople={setPeople}
      />
    </form>
  );
}

function BillDisplay({ tip, total, onReset }) {
  return (
    <div className=" flex  justify-between flex-col bg-very_dark_cyan p-10  rounded-xl mx-4 mb-4">
      <div>
        <TotalDisplay tip={tip.toFixed(2)}>Tip Amount</TotalDisplay>
        <TotalDisplay2 total={total.toFixed(2)}>Total</TotalDisplay2>
      </div>
      <div className="mt-5 flex justify-center w-full">
        <Reset onReset={onReset} />
      </div>
    </div>
  );
}

function TotalDisplay({ tip, children }) {
  return (
    <div className="flex  md:space-x-4 justify-between  items-center mt-8">
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-2xl font-mono">{children}</h1>
        <p className="text-grayish_cyan">/ person</p>
      </div>
      <div className="flex items-center">
        <img src="/images/icon-dollar.svg" alt="" className="h-8" />
        <h1
          id="totalperperson"
          className="  font-mon font-bold text-4xl text-light_grayish_cyan"
        >
          {tip}
        </h1>
      </div>
    </div>
  );
}
function TotalDisplay2({ total, children }) {
  return (
    <div className="flex md:space-x-4 justify-between items-center mt-8">
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-2xl font-mono">{children}</h1>
        <p className="text-grayish_cyan">/ person</p>
      </div>
      <div className="flex items-center">
        <img src="/images/icon-dollar.svg" alt="" className="h-8" />
        <h1
          id="totalperperson"
          className="  font-mon font-bold text-4xl text-light_grayish_cyan"
        >
          {total}
        </h1>
      </div>
    </div>
  );
}
function Entry({ label, icon, bill, setBill }) {
  return (
    <div className="flex flex-col p-4 mt-5">
      <div className="flex justify-start font-bold text-lg text-grayish_cyan">
        {label}
      </div>
      <div className=" flex flex-row items-center justify-between bg-very_light_grayish_cyan text-4xl px-6 font-medium rounded-lg">
        <img src={icon} alt="" />
        <input
          type="text"
          className="border-l-2 focus:outline-none md:h-10 h-14 w-2/5 bg-very_light_grayish_cyan font-bold text-very_dark_cyan"
          value={bill}
          onChange={(e) =>
            !isNaN(e.target.value)
              ? setBill(Number(e.target.value))
              : setBill(0)
          }
        />
      </div>
    </div>
  );
}

function Entry2({ label, icon, people, setPeople }) {
  return (
    <div className="flex flex-col p-4 mt-5">
      <div className="flex justify-start font-bold text-lg text-grayish_cyan">
        {label}
      </div>
      <div className=" flex flex-row items-center justify-between bg-very_light_grayish_cyan text-4xl px-6 font-medium rounded-lg">
        <img src={icon} alt="" />
        <input
          type="text"
          className="border-l-2 focus:outline-none md:h-10 h-14 w-2/5 bg-very_light_grayish_cyan font-bold text-very_dark_cyan"
          value={people}
          onChange={(e) =>
            !isNaN(e.target.value)
              ? setPeople(Number(e.target.value))
              : setPeople(0)
          }
        />
      </div>
    </div>
  );
}
function TipDisplay({ onClick }) {
  return (
    <div className=" flex flex-col w-full space-y-5 md:mt-2 mt-8 mb-8">
      <div className="w-full font-bold text-grayish_cyan text-xl tracking-wide">
        <h1>Select Tip %</h1>
      </div>
      <div
        id="tips"
        className="w-full grid md:grid-cols-3 grid-cols-2 md:gap-2 gap-8"
      >
        <Button tip={10} onClick={onClick} />
        <Button tip={15} onClick={onClick} />
        <Button tip={20} onClick={onClick} />
        <Button tip={25} onClick={onClick} />
        <Button tip={50} onClick={onClick} />
        <input
          type="text"
          className=" pl-1 bg-light_grayish_cyan text-grayish_cyan font-bold md:text-xl text-4xl rounded-lg"
          placeholder="Custom%"
          onChange={(e) => onClick(e)}
        />
      </div>
    </div>
  );
}

function Button({ tip, onClick }) {
  return (
    <button
      type="button"
      className="md:px-0 px-16 py-2  bg-very_dark_cyan text-white font-bold text-2xl rounded-lg"
      value={tip}
      onClick={(e) => onClick(e)}
    >
      {tip}%
    </button>
  );
}

function Reset({ onReset }) {
  return (
    <button
      type="button"
      className="w-2/3md:px-0 px-16 py-2 bg-strong_cyan
      text-very_dark_cyan font-bold text-2xl rounded-lg"
      onClick={onReset}
    >
      Reset
    </button>
  );
}
