import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TransformDataPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return value.trim(); // Chuyển đổi chuỗi, loại bỏ khoảng trắng
    }

    if (typeof value === 'number') {
      return value; // Giữ nguyên số
    }

    if (typeof value === 'boolean') {
      return value; // Giữ nguyên boolean
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.transform(item)); // Chuyển đổi từng phần tử trong mảng
    }

    if (typeof value === 'object' && value !== null) {
      // Chuyển đổi từng thuộc tính trong đối tượng
      return Object.entries(value).reduce((acc, [key, val]) => {
        acc[key] = this.transform(val);
        return acc;
      }, {});
    }

    throw new BadRequestException('Invalid data type');
  }
}
