export enum EntityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
}

export const EntityStatusDescription: Record<EntityStatus, string> = {
  [EntityStatus.ACTIVE]: 'Ativo',
  [EntityStatus.INACTIVE]: 'Inativo',
  [EntityStatus.EXPIRED]: 'Expirado',
  [EntityStatus.CANCELED]: 'Cancelado',
};
