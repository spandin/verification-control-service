import { Controller, Get, Res } from '@nestjs/common'
import { ApiHideProperty, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { join } from 'path'

@Controller('api')
export class SpecController {
  @Get('swagger-spec')
  @ApiHideProperty()
  @ApiOperation({
    summary: 'Download Swagger Specification',
    description: 'Download the Swagger specification file in JSON format.',
  })
  @ApiProduces('application/json')
  @ApiResponse({ status: 200, description: 'Swagger specification file downloaded successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to download the Swagger specification file.' })
  downloadSwaggerSpec(@Res() res: Response) {
    const filePath = join(__dirname, '../../swagger-spec.json')
    res.download(filePath, 'swagger-spec.json', (err) => {
      if (err) {
        res.status(500).send({
          message: 'Could not download the file.',
          error: err,
        })
      }
    })
  }
}
