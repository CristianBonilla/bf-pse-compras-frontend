import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EnvConfig } from './env-config';
import { ResourcesConfig } from './resources-config';

@Injectable()
export class EnvironmentLoaderService {
  private envConfig!: EnvConfig;
  private resourcesConfig!: ResourcesConfig;

  constructor(private readonly http: HttpClient) {}

  async loadEnvConfig(configPath: string,configPathResources:string ): Promise<void> {   
    this.envConfig = await lastValueFrom(this.http.get<EnvConfig>(configPath));
    this.resourcesConfig = await lastValueFrom(this.http.get<ResourcesConfig>(configPathResources));
  }

  getEnvConfig(): EnvConfig {
    return this.envConfig;
  }

  getResourceConfig(): ResourcesConfig {
    return this.resourcesConfig;
  }
}
