import { RoomData } from "@/app/(crud-property)/_types/property.type";

const getRoomName = (tempId: string, rooms: RoomData[]) => {
  const room = rooms.find((r) => r.tempId === tempId);
  return room?.name || `Room ${tempId.split("-")[2]}`;
};

export default getRoomName;
