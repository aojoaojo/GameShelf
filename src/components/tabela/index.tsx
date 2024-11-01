import { useContext, useState, useEffect } from 'react';
import './styles.css';
import { BoardgamesContext } from '../../contexts/BoardgamesContext';

interface Jogo {
  nome: string;
  num_jogadores_min: number;
  num_jogadores_max: number;
  tempo_medio_partida: number;
  data_lancamento: string;
  fabricante: string;
  designer: string | null;
  categoria: string;
  idade_minima: number;
  dificuldade: string;
  classificacao: number;
  expansoes: string | null;
}

export function Tabela() {

  const { games } = useContext(BoardgamesContext);
  const [sortedData, setSortedData] = useState<Jogo[]>(games);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Jogo; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]');
    console.log(savedGames);
    setSortedData(savedGames);
}, []);

  const sortData = (key: keyof Jogo) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[key] === null) return 1;
      if (b[key] === null) return -1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Jogo) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className='wrapper overflow-y-scroll'>
      <table className="table table-bordered text-center align-middle table-fixed">
        <thead className='sticky-top align-middle'>
          <tr className="table-secondary">
            <th onClick={() => sortData('nome')}>Nome {getSortIndicator('nome')}</th>
            <th onClick={() => sortData('num_jogadores_min')}>Jogadores Mínimos {getSortIndicator('num_jogadores_min')}</th>
            <th onClick={() => sortData('num_jogadores_max')}>Jogadores Máximos {getSortIndicator('num_jogadores_max')}</th>
            <th onClick={() => sortData('tempo_medio_partida')}>Tempo Médio {getSortIndicator('tempo_medio_partida')}</th>
            <th onClick={() => sortData('data_lancamento')}>Data de Lançamento {getSortIndicator('data_lancamento')}</th>
            <th onClick={() => sortData('fabricante')}>Fabricante {getSortIndicator('fabricante')}</th>
            <th onClick={() => sortData('designer')}>Designer {getSortIndicator('designer')}</th>
            <th onClick={() => sortData('categoria')}>Categoria {getSortIndicator('categoria')}</th>
            <th onClick={() => sortData('idade_minima')}>Idade Mínima {getSortIndicator('idade_minima')}</th>
            <th onClick={() => sortData('dificuldade')}>Dificuldade {getSortIndicator('dificuldade')}</th>
            <th onClick={() => sortData('classificacao')}>Classificação {getSortIndicator('classificacao')}</th>
            <th onClick={() => sortData('expansoes')}>Expansões {getSortIndicator('expansoes')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((jogo, index) => (
            <tr key={index}>
              <td>{jogo.nome}</td>
              <td>{jogo.num_jogadores_min}</td>
              <td>{jogo.num_jogadores_max}</td>
              <td>{jogo.tempo_medio_partida}</td>
              <td>{jogo.data_lancamento.split('-')[0]}</td>
              <td>{jogo.fabricante}</td>
              <td>{jogo.designer ? jogo.designer : 'N/A'}</td>
              <td>{jogo.categoria}</td>
              <td>{jogo.idade_minima}</td>
              <td>{jogo.dificuldade}</td>
              <td>{jogo.classificacao}</td>
              <td>{jogo.expansoes ? jogo.expansoes : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
