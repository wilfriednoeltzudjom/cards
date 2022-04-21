import { v1 as uuidV1 } from 'uuid';

function generateId() {
  return uuidV1();
}

export default { generateId };
