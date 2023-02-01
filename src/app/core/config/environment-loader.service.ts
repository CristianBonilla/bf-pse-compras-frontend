import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ResourcesConfig } from './resources-config';

@Injectable()
export class EnvironmentLoaderService {  
  private resourcesConfig!: ResourcesConfig;

  constructor(private readonly http: HttpClient) {}
  async loadEnvConfig(configPathResources:string ): Promise<void> {       
    this.resourcesConfig = await lastValueFrom(this.http.get<ResourcesConfig>(configPathResources));
  }
  getResourceConfig(): ResourcesConfig {
    return this.resourcesConfig;
  }
}
