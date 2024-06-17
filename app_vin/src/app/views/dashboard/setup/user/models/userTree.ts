export class FlatDirNodeUser
{
    id: number;
    codigo: string;
    nombre: string;
    nivel: number;
    estado: number;
    Parent_gerarquia_id: number;
    expandable: boolean;
    level: number;
    last: boolean;
}

export class DirNodeUser
{
    id: number;
    codigo: string;
    nombre: string;
    nivel: number;
    estado: number;
    Parent_gerarquia_id: number;
    expandable?: boolean;
    level?: number;
    last?: boolean;
    children?: DirNodeUser[];
}
