import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieService } from 'src/app/services/movie.service';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridMovieComponentModule } from 'src/app/components/grid-movie/grid-movie.module';
import { GridSkeletonComponentModule } from 'src/app/components/grid-skeleton/grid-skeleton.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [HomepageComponent],
  exports: [HomepageComponent],
  imports: [
CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    GridMovieComponentModule,
    GridSkeletonComponentModule
  ],
  providers: [MovieService],
})
export class HomePageModule {}
