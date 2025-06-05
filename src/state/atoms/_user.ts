import { atom } from 'jotai';

import type { User } from '@/persistence/entities/data/User';

export default atom<User | null>(null);
