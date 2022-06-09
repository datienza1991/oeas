import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Exam,
  ExamTakerList,
  ExamTakersTotalPoints,
} from '@batstateu/data-models';
import { DepartmentService, ExamsService } from '@batstateu/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'batstateu-exam-takers',
  templateUrl: './exam-takers.component.html',
  styleUrls: ['./exam-takers.component.less'],
})
export class ExamTakersComponent implements OnInit {
  examTakerList!: ExamTakerList[];
  examId!: number;
  criteria = '';
  private searchSubject$ = new BehaviorSubject<string>('');
  examTakersTotalPoints!: ExamTakersTotalPoints[];
  examDetail!: Exam;

  onViewScore(takerExamIdObj: any) {
    this.examService
      .getAllTakerAnswers(takerExamIdObj.userDetailId, takerExamIdObj.examId)
      .subscribe((val) => {
        this.modal.success({
          nzTitle: 'Total Score',
          nzContent: `The total score is: ${val.reduce(
            (a: any, b: any) => a + b['points'] || 0,
            0
          )}`,
        });
      });
  }
  onSearch(criteria: string) {
    this.criteria = criteria;
    this.searchSubject$.next(criteria);
  }
  constructor(
    private examService: ExamsService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private departmentService: DepartmentService
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }
  getAll(criteria: string) {
    this.examService
      .getAllExamTakers(this.examId, criteria)
      .subscribe((val) => {
        this.examTakerList = val;
      });
  }
  getAllExamTakersTotalPoints() {
    this.examService
      .getAllExamTakersTotalPoints(this.examId)
      .subscribe((val) => {
        this.examTakersTotalPoints = val;
        console.log(this.examTakersTotalPoints);
      });
  }
  onPrint() {
    this.generatePDF();
  }
  async generatePDF() {
    const dd = {
      content: [
        {
          columns: [
            {
              image: 'logo',
              width: 48,
              style: 'headerLogo',
            },
            [
              {
                text: 'Batangas State University',
                style: 'header',
              },
              { text: 'Graduate School', style: 'subheader' },
            ],
          ],
        },
        {
          columns: [
            [
              {
                columns: [
                  {
                    style: 'pageDetailTitle',
                    width: 80,

                    text: 'Exam Name:',
                  },
                  {
                    text: this.examDetail.name,
                  },
                ],
              },
              {
                columns: [
                  {
                    style: 'pageDetailTitle',
                    width: 80,
                    text: 'Subject:',
                  },
                  {
                    text: this.examDetail.subject,
                  },
                ],
              },
              {
                columns: [
                  { style: 'pageDetailTitle', width: 80, text: 'Department:' },
                  {
                    text: this.examDetail.department,
                  },
                ],
              },
            ],
            [
              {
                columns: [
                  {
                    style: 'pageDetailTitle',
                    width: 80,
                    text: 'Duration:',
                  },
                  {
                    text: `${this.examDetail.duration} mins`,
                  },
                ],
              },
              {
                columns: [
                  {
                    style: 'pageDetailTitle',
                    width: 80,
                    text: 'Start On:',
                  },
                  {
                    text: `${this.examDetail.startOn}`,
                  },
                ],
              },
              {
                columns: [
                  {
                    style: 'pageDetailTitle',
                    width: 80,
                    text: 'Faculty:',
                  },
                  {
                    text: this.examDetail.facultyName,
                  },
                ],
              },
            ],
          ],
        },

        this.table(this.examTakersTotalPoints, [
          { key: 'fullName', name: 'Full Name' },
          { key: 'gender', name: 'Gender' },
          { key: 'percent', name: 'Percentage' },
        ]),
      ],
      images: {
        logo: await this.getBase64ImageFromURL('assets/images/logo.png'),
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [-48, 0, 0, -6],
          alignment: 'center',
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [-48, 10, 0, 48],
          alignment: 'center',
        },
        headerLogo: {
          margin: [80, 0, 0, 0],
        },
        tableExample: {
          margin: [0, 16, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        pageDetailTitle: {
          alignment: 'right',
          bold: true,
          lineHeight: 1.15,
        },
      },
      defaultStyle: {
        columnGap: 5,
      },
    };

    pdfMake.createPdf(dd as any).open();
  }
  buildTableBody(data: any, columns: any) {
    const body = [];
    const convertedColumns: any = [];
    const toNormalText = this.convertToNormalText;
    columns.forEach((column: any) => {
      convertedColumns.push({
        text: toNormalText(column.name),
        style: 'tableHeader',
      });
    });

    body.push(convertedColumns);

    data.forEach(function (row: any) {
      const dataRow: any = [];

      columns.forEach(function (column: any) {
        dataRow.push(toNormalText(row[column.key].toString()));
      });

      body.push(dataRow);
    });

    return body;
  }
  table(data: any, columns: any) {
    return {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*'],
        body: this.buildTableBody(data, columns),
      },
    };
  }
  convertToNormalText(str: string) {
    return (
      str // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  }
  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.getAllExamTakersTotalPoints();
    this.getExamDetail();
    this.searchSubject$
      .asObservable()
      .pipe(
        map((val) => val.trim()),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((val) => {
        this.getAll(val);
      });
  }
  getExamDetail() {
    this.examService.get(this.examId).subscribe((exam) => {
      this.examDetail = exam;
    });
  }
}
