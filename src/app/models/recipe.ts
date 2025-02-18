export interface Recipe {
  id: string;
  title: string;
  ingredients: { name: string; amount: number; unit: string }[];
  description: string;
  imageUrl?: string;
  createdAt: Date;
}
