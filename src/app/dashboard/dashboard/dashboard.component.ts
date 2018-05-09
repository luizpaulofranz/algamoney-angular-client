import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  lineChartData: any;
  pieChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // carregamos os dados dos graficos do backend
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().then(dados => {
      this.pieChartData = {
        labels: dados.map(dado => dado.categoria.nome),
        datasets: [
          {
            data: dados.map(dado => dado.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
            '#DD4477', '#3366CC', '#DC3912']
          }
        ]
      };
    });
  }

  /** Monta um array com as posicoes do dia com seus totais */
  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia().then(dados => {
      // pegamos cada um dos dias do mes atual
      const diasDoMes = this.configurarDiasMes();
      // linha de receitas
      const totaisReceitas = this.totaisPorCadaDiaMes(
        // filter, pegamos apenas lancamentos tipo RECEITA
        dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
      // linha de despesas
      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      };
    });
  }

  /** Preenche o array de dias com os totais de cada dia */
  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  /** retorna um array com todos os dias do mes atual */
  private configurarDiasMes() {
    const mesReferencia = new Date();
    // jogamos pro mes que vem
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    // setamos o dia como zero, que eh na verdade o ultimo dia do mes anterior
    mesReferencia.setDate(0);
    // pegamos o ultimo dia do mes corrente
    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];
    // assim temos um arrau com todos os dias do mes atual
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}
