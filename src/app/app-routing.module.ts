import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { CollectionsPageComponent } from './pages/collections-page/collections-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'collection/:{{collection}}/:{id}', component: CollectionComponent },
  {
    path: 'item/:{{collection}}/:{collectionId}/:{tokenId}',
    component: ItemComponent,
  },
  { path: 'collections/:{chain}', component: CollectionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
