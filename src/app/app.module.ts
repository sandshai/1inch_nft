import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './lib/components/layout/layout.component';
import { HeaderComponent } from './lib/components/header/header.component';
import { FooterComponent } from './lib/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CardLargeComponent } from './lib/components/baseComponents/card-large/card-large.component';
import { CardSmallComponent } from './lib/components/baseComponents/card-small/card-small.component';
import { BannerComponent } from './lib/components/groupComponents/banner/banner.component';
import { CardSmallXComponent } from './lib/components/baseComponents/card-small-x/card-small-x.component';
import { TrendingCollectionsComponent } from './lib/components/groupComponents/trending-collections/trending-collections.component';
import { NewCollectionsComponent } from './lib/components/groupComponents/new-collections/new-collections.component';
import { CardBadgeComponent } from './lib/components/baseComponents/card-badge/card-badge.component';
import { HighlightProjectsComponent } from './lib/components/groupComponents/highlight-projects/highlight-projects.component';
import { CardExtraLargeComponent } from './lib/components/baseComponents/card-extra-large/card-extra-large.component';
import { UtilityCollectionsComponent } from './lib/components/groupComponents/utility-collections/utility-collections.component';
import { ExploreCategoriesComponent } from './lib/components/groupComponents/explore-categories/explore-categories.component';
import { CardComponent } from './lib/components/baseComponents/card/card.component';
import { SectionEndLineComponent } from './lib/components/groupComponents/section-end-line/section-end-line.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionComponent } from './pages/collection/collection.component';
import { CollectionCardComponent } from './lib/components/baseComponents/collection-card/collection-card.component';
import { ButtonComponent } from './lib/components/baseComponents/button/button.component';
import { TaggleSwitchComponent } from './lib/components/baseComponents/taggle-switch/taggle-switch.component';
import { SvgImageComponent } from './lib/components/baseComponents/svg-image/svg-image.component';
import { CheckboxComponent } from './lib/components/baseComponents/checkbox/checkbox.component';
import { InputComponent } from './lib/components/baseComponents/input/input.component';
import { SelectComponent } from './lib/components/baseComponents/select/select.component';
import { CollectionFilterComponent } from './lib/components/baseComponents/collection-filter/collection-filter.component';
import { GridViewCollectionComponent } from './lib/components/baseComponents/grid-view-collection/grid-view-collection.component';
import { CollectionRightSideTabComponent } from './lib/components/baseComponents/collection-right-side-tab/collection-right-side-tab.component';
import { AnalyticsTabComponent } from './lib/components/baseComponents/analytics-tab/analytics-tab.component';
import { ActivityTabComponent } from './lib/components/baseComponents/activity-tab/activity-tab.component';
import { ListViewCollectionsComponent } from './lib/components/baseComponents/list-view-collections/list-view-collections.component';
import { CardViewCollectionsComponent } from './lib/components/baseComponents/card-view-collections/card-view-collections.component';
import { WalletButtonComponent } from './lib/components/baseComponents/wallet-button/wallet-button.component';
import { HeaderSearchComponent } from './lib/components/baseComponents/header-search/header-search.component';
import { WalletComponent } from './lib/components/baseComponents/wallet/wallet.component';
import { CartComponent } from './lib/components/baseComponents/cart/cart.component';
import { ValumePriceGraphComponent } from './lib/components/baseComponents/valume-price-graph/valume-price-graph.component';
import { SalesGraphComponent } from './lib/components/baseComponents/sales-graph/sales-graph.component';
import { OwnerDistributionGraphComponent } from './lib/components/baseComponents/owner-distribution-graph/owner-distribution-graph.component';
import { ListingsGraphComponent } from './lib/components/baseComponents/listings-graph/listings-graph.component';
import { ListingsDisturbtionComponent } from './lib/components/baseComponents/listings-disturbtion/listings-disturbtion.component';
import { HoldersComponent } from './lib/components/baseComponents/holders/holders.component';
import { SweepAndAnalyticsMobileTabComponent } from './lib/components/baseComponents/sweep-and-analytics-mobile-tab/sweep-and-analytics-mobile-tab.component';
import { ItemComponent } from './pages/item/item.component';
import { ItemProfileComponent } from './lib/components/baseComponents/item-profile/item-profile.component';
import { ItemBuyDetailsComponent } from './lib/components/baseComponents/item-buy-details/item-buy-details.component';
import { TraitsComponent } from './lib/components/baseComponents/traits/traits.component';
import { ActivityGraphComponent } from './lib/components/baseComponents/activity-graph/activity-graph.component';
import { ItemDetailsComponent } from './lib/components/baseComponents/item-details/item-details.component';
import { NumberShortenPipe } from './lib/pipes/number-shorten.pipe';
import { CollectionsPageComponent } from './pages/collections-page/collections-page.component';
import { SharedDataService } from './lib/services/shared-data.service';
import { CollectionsListTableFilterComponent } from './lib/components/baseComponents/collections-list-table-filter/collections-list-table-filter.component';
import { FormsModule } from '@angular/forms';
import { FilterButtonComponent } from './lib/components/baseComponents/filter-button/filter-button.component';
import { ImagePreviewComponent } from './lib/components/baseComponents/image-preview/image-preview.component';
import { NavMenusComponent } from './lib/components/baseComponents/nav-menus/nav-menus.component';
import { SvgIconsComponent } from './lib/components/baseComponents/svg-icons/svg-icons.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    CardLargeComponent,
    CardSmallComponent,
    BannerComponent,
    CardSmallXComponent,
    TrendingCollectionsComponent,
    NewCollectionsComponent,
    CardBadgeComponent,
    HighlightProjectsComponent,
    CardExtraLargeComponent,
    UtilityCollectionsComponent,
    ExploreCategoriesComponent,
    CardComponent,
    SectionEndLineComponent,
    CollectionComponent,
    CollectionCardComponent,
    ButtonComponent,
    TaggleSwitchComponent,
    SvgImageComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
    CollectionFilterComponent,
    GridViewCollectionComponent,
    CollectionRightSideTabComponent,
    AnalyticsTabComponent,
    ActivityTabComponent,
    ListViewCollectionsComponent,
    CardViewCollectionsComponent,
    WalletButtonComponent,
    HeaderSearchComponent,
    WalletComponent,
    CartComponent,
    ValumePriceGraphComponent,
    SalesGraphComponent,
    OwnerDistributionGraphComponent,
    ListingsGraphComponent,
    ListingsDisturbtionComponent,
    HoldersComponent,
    SweepAndAnalyticsMobileTabComponent,
    ItemComponent,
    ItemProfileComponent,
    ItemBuyDetailsComponent,
    TraitsComponent,
    ActivityGraphComponent,
    ItemDetailsComponent,
    NumberShortenPipe,
    CollectionsPageComponent,
    CollectionsListTableFilterComponent,
    FilterButtonComponent,
    ImagePreviewComponent,
    NavMenusComponent,
    SvgIconsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}