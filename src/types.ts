export type Category = 'ทั้งหมด' | 'อาหารทานเล่น' | 'อาหารจานหลัก' | 'ของหวาน' | 'เครื่องดื่ม';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  icon: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}
