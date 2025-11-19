import { RoomData } from "@/app/(crud-property)/_types/property.type";

const getRoomBasePrice = (tempId: string, rooms: RoomData[]) => {
  const room = rooms.find((r) => r.tempId === tempId);
  return room?.base_price || 0;
};

export default getRoomBasePrice;
