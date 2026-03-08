import { useState, useRef, useEffect } from "react";


export function Licenses() {
  const [showLicenses, setShowLicenses] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current) { return }

    if (dialogRef.current.open && !showLicenses) {
      dialogRef.current.close()
    } else if (!dialogRef.current.open && showLicenses) {
      dialogRef.current.showModal()
    }
  }, [showLicenses])

  const handleLicensesClick = () => {
    setShowLicenses(!showLicenses);
  };

  const data = [
    {
      group: "Kenny Pixel Platformer",
      link: "https://kenney.nl/assets/pixel-platformer",
      assets:[
        "assets/characters.png",
        "assets/tiles.png",
        "assets/backgrounds.png",
      ],
    },
    {
      group: "Kenny Fonts",
      link: "https://kenney.nl/assets/kenney-fonts",
      assets:[
        "assets/characters.png",
        "assets/tiles.png",
        "assets/backgrounds.png",
      ],
    },
    {
      group: "Raylib",
      link: "https://github.com/raysan5/raylib/tree/master/examples",
      assets:[
        "assets/scarfy.png",
        "assets/ps3.png",
        "assets/xbox.png",
      ],
    },
    {
      group: "Positive Loop",
      link: "https://pixabay.com/music/electronic-positive-loop-494799/",
      assets:[
        "assets/positive_loop.ogg",
      ],
    }
  ];

  return (
    <>
      <a data-testid="licenses" className="button toolbar--licenses-button" onClick={handleLicensesClick}>
        Licenses
      </a>
      <dialog className="licenses--modal" ref={dialogRef}>
        {data.map(datum => <p>
            <a
              className="licenses--title"
              href={datum.link}>
              {datum.group}
            </a>
            <ul>{datum.assets.map(asset => <li>{asset}</li>)}</ul>
          </p>)}

        <a data-testid="licenses" className="button licenses--modal--close-button" onClick={handleLicensesClick}>
          Close
        </a>
      </dialog>
    </>
  );
}

