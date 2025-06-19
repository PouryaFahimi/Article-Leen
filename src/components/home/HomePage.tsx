import LetterBox from "./LetterBox";

const HomePage = () => {
  const brand = [[..."article"], [..."leen"]];
  let index = 0;

  const showBrand = () => {
    return brand.map((word) => (
      <div className="flex-line">
        {word.map((letter) => (
          <LetterBox delay={index++ * 1000}>{letter.toUpperCase()}</LetterBox>
        ))}
      </div>
    ));
  };

  return (
    <>
      <h1 className="flex-line">Welcome To</h1>
      {showBrand()}
    </>
  );
};

export default HomePage;
