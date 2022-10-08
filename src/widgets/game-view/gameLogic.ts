import { Assets } from "@pixi/assets";
import { Application, Sprite, Container, Texture, Loader } from "pixi.js";
import Keyboard from "pixi.js-keyboard";

import { GAME_ASSETS } from "utils/constants/assets";

type CarPosition =
  | "CENTER"
  | "CENTER_TO_LEFT"
  | "CENTER_TO_RIGHT"
  | "LEFT"
  | "LEFT_TO_CENTER"
  | "RIGHT"
  | "RIGHT_TO_CENTER";

let CarStatus: CarPosition = "CENTER";

export const LoadAssets = (app: Application) => {
  GAME_ASSETS.forEach(({ name, url }) => {
    Assets.add(name, url);
  });
  const texturesPromise = Assets.load(GAME_ASSETS.map((item) => item.name));
  texturesPromise.then((textures) => {
    // Create `a new texture
    // const sky_texture = Texture.from("images/sky.png");

    const sky = Sprite.from(textures.sky);
    // center the sprite's anchor point

    // move the sprite to the center of the screen
    sky.width = app.screen.width;
    sky.height = app.screen.height / 2;
    sky.zIndex = 1;
    sky.name = "sky";

    const road = new Sprite(textures.road);

    // move the sprite to the center of the screen
    road.width = app.screen.width;
    road.height = app.screen.height / 2;
    road.y = app.screen.height - road.height;
    road.zIndex = 3;

    const mountain_fade = new Sprite(textures.mountain_fade);

    // move the sprite to the center of the screen
    mountain_fade.width = app.screen.width;
    mountain_fade.zIndex = 2;

    const car_center = new Sprite(textures.car);

    // move the sprite to the center of the screen
    car_center.scale.x = 0.35;
    car_center.scale.y = 0.35;
    car_center.y = app.screen.height;
    car_center.x = app.screen.width / 2;
    // center the sprites anchor point
    car_center.anchor.set(0.5, 1.1);
    car_center.zIndex = 4;
    car_center.name = "car";

    app.stage.addChild(sky);
    app.stage.addChild(mountain_fade);
    app.stage.addChild(road);
    app.stage.addChild(car_center);
    // const newSky = app.stage.getChildByName("sky");
    // newSky.scale.x = 2;
    // app.stage.addChild(newSky);

    StartAnimations(app);
  });
};

//Game loop
export const StartAnimations = (app: Application) => {
  let count: number = 0.38;

  const car = app.stage.getChildByName("car");
  let up = true;
  app.ticker.add(() => {
    if (count > 0.4) {
      up = false;
    }
    if (count < 0.38) {
      up = true;
    }
    if (up) {
      count += 0.001;
      car.y += Math.sin(count);
    } else {
      count -= 0.001;
      car.y -= Math.sin(count);
    }

    InputChecker(app);
    CheckStatus(app);
  });
};

export const InputChecker = (app: Application) => {
  const car: Sprite = app.stage.getChildByName("car");
  Keyboard.update();
  if (Keyboard.isKeyDown("ArrowLeft", "KeyA")) {
    car.x -= 10;
    ChangeStatus("LEFT");
  }
  if (Keyboard.isKeyDown("ArrowRight", "KeyD")) {
    car.x += 10;
    ChangeStatus("RIGHT");
  }
};

let MovmentCounter = 0;

const CheckStatus = (app: Application) => {
  const car: Sprite = app.stage.getChildByName("car");

  switch (CarStatus) {
    case "CENTER_TO_LEFT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_left") as Texture;
      }
      MovmentCounter += 0.1;
      if (MovmentCounter >= 5) {
        MovmentCounter = 0;
        car.texture = Assets.get("car") as Texture;
        CarStatus = "LEFT";
      }
      car.x -= MovmentCounter;
      break;
    case "CENTER_TO_RIGHT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_right") as Texture;
      }
      MovmentCounter += 0.1;
      if (MovmentCounter >= 5) {
        MovmentCounter = 0;
        car.texture = Assets.get("car") as Texture;
        CarStatus = "RIGHT";
      }
      car.x += MovmentCounter;
      break;
    case "RIGHT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_left") as Texture;
      }
      MovmentCounter += 0.1;
      if (MovmentCounter >= 5) {
        MovmentCounter = 0;
        car.texture = Assets.get("car") as Texture;
        CarStatus = "CENTER";
      }
      car.x -= MovmentCounter;
      break;
    case "LEFT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_right") as Texture;
      }
      MovmentCounter += 0.1;
      if (MovmentCounter >= 5) {
        MovmentCounter = 0;
        car.texture = Assets.get("car") as Texture;
        CarStatus = "CENTER";
      }
      car.x += MovmentCounter;
      break;
    default:
      break;
  }
  console.log(CarStatus);
};

const ChangeStatus = (dir: "LEFT" | "RIGHT") => {
  if (dir === "LEFT") {
    switch (CarStatus) {
      case "CENTER":
        CarStatus = "CENTER_TO_LEFT";
        break;
      case "RIGHT":
        CarStatus = "RIGHT_TO_CENTER";
        break;
      default:
        break;
    }
  } else {
    switch (CarStatus) {
      case "CENTER":
        CarStatus = "CENTER_TO_RIGHT";
        break;
      case "LEFT":
        CarStatus = "LEFT_TO_CENTER";
        break;
      default:
        break;
    }
  }
};
