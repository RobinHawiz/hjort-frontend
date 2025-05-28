/**
 * Represents a single drink menu entry stored in a database.
 */
export type DrinkMenuEntity = {
  /** Unique identifier */
  id: string;
  title: string;
  subtitle: string;
  priceTot: number;
};

/**
 * Represents a single drink entry stored in a database.
 */
export type DrinkEntity = {
  /** Unique identifier */
  id: string;
  drinkMenuId: string;
  name: string;
};

/**
 * Represents both the drink menu and it's associated drinks.
 */
export type drinkMenuObject = {
  menu: DrinkMenuEntity;
  drinks: Array<DrinkEntity>;
};
