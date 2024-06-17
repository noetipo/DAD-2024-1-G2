export class FlatDirNode
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

export class DirNode
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
    children?: DirNode[];
}
