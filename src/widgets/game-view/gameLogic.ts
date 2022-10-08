import { Assets } from "@pixi/assets";
import {
  Application,
  Sprite,
  Container,
  Texture,
  Loader,
  AnimatedSprite,
} from "pixi.js";
import Keyboard from "pixi.js-keyboard";

import { GAME_ASSETS, MAX_MOVMENT } from "utils/constants/assets";

type CarPosition =
  | "CENTER"
  | "CENTER_TO_LEFT"
  | "CENTER_TO_RIGHT"
  | "LEFT"
  | "LEFT_TO_CENTER"
  | "RIGHT"
  | "RIGHT_TO_CENTER";

let CarStatus: CarPosition = "CENTER";

const enemyTypes: {
  type: "CENTER" | "LEFT" | "RIGHT";
  carType: "enemy" | "enemy_left" | "enemy_right";
}[] = [
  { type: "RIGHT", carType: "enemy_right" },
  { type: "CENTER", carType: "enemy" },
  { type: "LEFT", carType: "enemy_left" },
];

let currentEnemy: { sprite: Sprite; type: "CENTER" | "LEFT" | "RIGHT" };
let explosion: any;
// centerEnemy: Sprite;

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
    road.name = "road";

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

    currentEnemy = { sprite: new Sprite(textures.enemy), type: "CENTER" };
    // centerEnemy.scale.x = 0.08;
    // centerEnemy.scale.y = 0.08;
    // centerEnemy.y = road.height + 10;
    // centerEnemy.x = app.screen.width / 2 - 25;
    // centerEnemy.anchor.set(0.5, 1.1);

    // // center the sprites anchor point
    // centerEnemy.zIndex = 4;
    // centerEnemy.name = "enemy";
    explosion = new AnimatedSprite([
      textures.explosion_spritesheet,
      textures.explosion_spritesheet1,
      textures.explosion_spritesheet2,
      textures.explosion_spritesheet3,
      textures.explosion_spritesheet4,
      textures.explosion_spritesheet5,
    ]);
    explosion.scale.x = 0.3;
    explosion.scale.y = 0.3;
    explosion.name = "explosion";

    explosion.x = app.screen.width / 2;
    explosion.y = app.screen.height / 2;
    explosion.anchor.set(0.5);
    explosion.animationSpeed = 0.5;
    explosion.play();

    app.stage.addChild(sky);
    app.stage.addChild(mountain_fade);
    app.stage.addChild(road);
    app.stage.addChild(car_center);

    StartAnimations(app);
  });
};

//Game loop
export const StartAnimations = (app: Application) => {
  let count: number = 0.38;
  let firstTime = false;

  const car: Sprite = app.stage.getChildByName("car");
  const road: Sprite = app.stage.getChildByName("road");

  setInterval(() => {
    if (!firstTime) firstTime = true;
    let enemy = currentEnemy.sprite;
    let typeNum = Math.floor(Math.random() * 3);
    const type = enemyTypes[typeNum];
    enemy.texture = Assets.get(type.carType) as Texture;
    enemy.scale.x = 0.08;
    enemy.scale.y = 0.08;
    enemy.y = road.height + 10;
    enemy.x = app.screen.width / 2 - 25;
    enemy.anchor.set(0.5, 1.1);

    // center the sprites anchor point
    enemy.zIndex = 4;
    enemy.name = "enemy";

    currentEnemy = {
      sprite: enemy,
      type: type.type,
    };

    app.stage.addChild(currentEnemy.sprite);
  }, 3000);

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
    if (currentEnemy) {
      const { sprite, type } = currentEnemy;
      switch (type) {
        case "CENTER":
          sprite.y += 1.6;
          sprite.x += 0.2;
          sprite.scale.x += 0.0025;
          sprite.scale.y += 0.0025;
          break;
        case "LEFT":
          sprite.y += 1.7;
          sprite.x += 1.9;
          sprite.scale.x += 0.0025;
          sprite.scale.y += 0.0025;
          break;
        case "RIGHT":
          sprite.y += 1.7;
          sprite.x -= 1.7;
          sprite.scale.x += 0.0025;
          sprite.scale.y += 0.0025;
          break;
        default:
          break;
      }
      if (testForAABB(sprite, car) && firstTime) {
        app.stage.removeChild(sprite);
        app.stage.addChild(explosion);
        setTimeout(() => {
          app.stage.removeChild(explosion);
          app.stage.addChild(car);
        }, 1000);
        // car.texture = Assets.get("explosion_spritesheet") as Texture;
      }
    }

    InputChecker(app);
    CheckStatus(app);
  });
};

export const InputChecker = (app: Application) => {
  const car: Sprite = app.stage.getChildByName("car");
  Keyboard.update();
  if (Keyboard.isKeyDown("ArrowLeft", "KeyA")) {
    ChangeStatus("LEFT");
  }
  if (Keyboard.isKeyDown("ArrowRight", "KeyD")) {
    ChangeStatus("RIGHT");
  }
};

let MovmentCounter = 0;

const CheckStatus = (app: Application) => {
  const car: Sprite = app.stage.getChildByName("car");

  switch (CarStatus) {
    case "CENTER_TO_LEFT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_right") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        // car.texture = Assets.get("car") as Texture;
        CarStatus = "LEFT";
      }
      car.x -= MovmentCounter;
      break;
    case "CENTER_TO_RIGHT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_left") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "RIGHT";
      }
      car.x += MovmentCounter;
      break;
    case "RIGHT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "CENTER";
      }
      car.x -= MovmentCounter;
      break;
    case "LEFT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "CENTER";
      }
      car.x += MovmentCounter;
      break;
    default:
      break;
  }
};

const ChangeStatus = (dir: "LEFT" | "RIGHT") => {
  if (dir === "LEFT") {
    console.log(CarStatus);

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

// Test For Hit
// A basic AABB check between two different squares
function testForAABB(object1: Sprite, object2: Sprite) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}
