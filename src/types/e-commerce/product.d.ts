export interface ECommerceProduct {
  id: number;
  textTH: string;
  textEN: string;
  order: number | null;
  createdAt: Date;
  updatedAt: Date;
  categoryMemorizeSentenceId: number;
  groupMemorizeSentenceId: number | null;
  userId: string;
}
