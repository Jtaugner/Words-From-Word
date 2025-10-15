<template>
	<div id="app"
		 :class="[
			 'chosenAppBg' + chosenBgRight,
		  showGameLocation ? 'locationOpened' : '',
		   'gameLocationWrapper-' + locationClassID
		   ]"
	>
		<!--    <div class="close-level-help prev-location next-location"></div>-->
		<div class="levels"
			 @updateAll="updateAll()"
			 @canShowAdv="setCanShowAdv()"
			 @buyTips="addBuyTips()"
			 @disableAds="disableAds()"
			 @unableAds="unableAds()"
			 @switchOpenLocations="switchOpenLocations()"
			 @changeOrientation="changeOrientation()"
			 @switchOnMusic="switchOnMusic()"
			 @switchPause="switchPause()"
			 v-show="levels" :class="[levelsAnim ? 'levelsAnim' : '']">
			<div class="blur" v-if="chosenBgRight === 6"></div>

			<div class="snowAnimation"></div>

<!--			<div class="blur"></div>-->





			<div class="levels__property">
				<div class="levelsTop">
					<div class="eventIcon-wrapper" @click="openGameWindowForTwo()"  v-if="!notRussian">
<!--						<div class="eventIcon"></div>-->
						<div class="menuItem eventIconItem">
							<svg class="svgIcon" width="27" height="18" viewBox="0 0 27 18" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.0051 0.976039C4.77498 1.07044 4.27056 1.36699 4.09383 1.79801C4.05718 1.88739 3.95745 2.15148 3.81734 2.53971C3.88292 2.50457 3.94214 2.4768 3.9907 2.45689C4.75968 2.11454 6.5378 1.42983 7.4985 1.42983C8.50045 1.42983 9.16141 2.34832 9.65116 3.02889C9.74839 3.164 9.83887 3.28974 9.92393 3.39705C10.3348 3.91532 10.98 4.08175 11.2512 4.10018C12.4916 4.10808 15.0845 4.08912 15.5332 3.95007C15.7842 3.87233 16.1489 3.44206 16.5631 2.95344C17.0749 2.34971 17.6622 1.65689 18.2036 1.42983C19.1143 1.04792 21.2131 1.9906 22.0752 2.37904C21.9832 2.14717 21.9024 1.95187 21.8361 1.79801C21.7509 1.61612 21.4564 1.19707 20.9593 0.976039C20.9178 0.957577 20.8699 0.93597 20.8163 0.911827C20.0684 0.574651 18.2235 -0.257093 17.4247 0.0780877C16.9515 0.276602 16.4383 0.882331 15.9911 1.41017C15.6292 1.83737 15.3105 2.21355 15.0912 2.28152C14.6991 2.40309 12.4334 2.41967 11.3495 2.41276C11.1125 2.39664 10.5487 2.25113 10.1897 1.79801C10.1154 1.70419 10.0363 1.59426 9.95134 1.47613C9.52339 0.881111 8.94583 0.0780877 8.0703 0.0780877C7.23082 0.0780877 5.67705 0.676722 5.0051 0.976039Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.9908 2.4567C3.72745 2.56468 3.15019 2.90387 2.94794 3.39686C2.69512 4.01309 -0.180638 11.8898 0.00897234 14.3627C0.198583 16.8355 2.2843 18.1628 3.13755 17.7204C3.9908 17.2779 4.79664 16.6538 7.27738 13.7701C7.82251 13.5252 8.31234 13.4304 8.87327 13.4304H17.5717C17.9456 13.4225 18.8263 13.5489 19.3572 14.1178C19.4691 14.2377 19.6321 14.429 19.8311 14.6624C20.8118 15.813 22.6671 17.9896 23.5997 17.7204C23.6435 17.7077 23.689 17.695 23.7357 17.6819C24.8853 17.3597 26.8401 16.8118 25.8987 11.5659C24.9949 7.84323 23.7577 4.56876 23.2521 3.39686C23.1546 3.18881 22.8176 2.70952 22.2487 2.4567C22.2012 2.43559 22.1464 2.41087 22.0851 2.38326C21.2292 1.9976 19.1179 1.04628 18.2037 1.42965C17.6623 1.6567 17.075 2.34952 16.5632 2.95325C16.149 3.44187 15.7843 3.87214 15.5333 3.94989C15.0846 4.08893 12.4917 4.10789 11.2513 4.09999C10.9801 4.08156 10.3349 3.91513 9.92403 3.39686C9.83897 3.28955 9.74849 3.16381 9.65126 3.0287C9.1615 2.34813 8.50055 1.42965 7.49859 1.42965C6.5379 1.42965 4.75977 2.11435 3.9908 2.4567ZM21.0305 3.86888C21.0305 4.25239 20.7196 4.56329 20.3361 4.56329C19.9526 4.56329 19.6417 4.25239 19.6417 3.86888C19.6417 3.48538 19.9526 3.17448 20.3361 3.17448C20.7196 3.17448 21.0305 3.48538 21.0305 3.86888ZM6.00001 8.00016C7.10458 8.00016 8.00001 7.10473 8.00001 6.00016C8.00001 4.89559 7.10458 4.00016 6.00001 4.00016C4.89544 4.00016 4.00001 4.89559 4.00001 6.00016C4.00001 7.10473 4.89544 8.00016 6.00001 8.00016ZM16.8211 12.2143C18.2043 12.2143 19.3256 11.093 19.3256 9.70983C19.3256 8.32667 18.2043 7.20539 16.8211 7.20539C15.4379 7.20539 14.3167 8.32667 14.3167 9.70983C14.3167 11.093 15.4379 12.2143 16.8211 12.2143ZM20.3361 7.19207C20.7196 7.19207 21.0305 6.88117 21.0305 6.49767C21.0305 6.11416 20.7196 5.80326 20.3361 5.80326C19.9526 5.80326 19.6417 6.11416 19.6417 6.49767C19.6417 6.88117 19.9526 7.19207 20.3361 7.19207ZM22.4689 5.13345C22.4689 5.50326 22.1691 5.80305 21.7993 5.80305C21.4295 5.80305 21.1297 5.50326 21.1297 5.13345C21.1297 4.76364 21.4295 4.46384 21.7993 4.46384C22.1691 4.46384 22.4689 4.76364 22.4689 5.13345ZM18.9721 5.80305C19.3419 5.80305 19.6417 5.50326 19.6417 5.13345C19.6417 4.76364 19.3419 4.46384 18.9721 4.46384C18.6023 4.46384 18.3025 4.76364 18.3025 5.13345C18.3025 5.50326 18.6023 5.80305 18.9721 5.80305ZM11.5673 9.73327C11.5673 10.9288 10.5982 11.898 9.40261 11.898C8.20707 11.898 7.23789 10.9288 7.23789 9.73327C7.23789 8.53772 8.20707 7.56855 9.40261 7.56855C10.5982 7.56855 11.5673 8.53772 11.5673 9.73327Z"/></svg>
						</div>
					</div>
					<!--@click="goToGetLocations"-->
					<div class="openBgChanger" @click="toggleBgChanger"></div>
					<div
						class="levelsTop__allStars"
						:class="[notRussian ? 'levelsTop__allStars_withoutLB' : '']"
						@click="toggleShowInfoAboutStars"
					>
						{{allStars}}/{{ (location+1)*(lvlsOnPage*3)}}
						<div class="bg-star_main-wrapper" v-if="chosenBgRight === 6">
							<div  class="bg-star bg-star_main" :class="'bg-star' + randomStars[60]"></div>
						</div>

						<svg v-else class="svgIcon" width="18" height="17" viewBox="0 0 18 17" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"/></svg>

						<!--					<div class="menu-star"></div>-->
					</div>
				</div>

				<div class="levels-wrapper" :class="{
					'levels-wrapper_bigLevels': location*lvlsOnPage >= 1000,
					'levels-wrapper_veryBigLevels': location*lvlsOnPage >= 10000
				}">
					<div
						class="level"
						v-for="level in lvlsOnPage"
						v-if="canShowLevel(getLevelByLevelAndLocation(level)-1)"
						:key="getLevelByLevelAndLocation(level)"
						@click="getLevel(getLevelByLevelAndLocation(level)-1, false, true)"
						:class="{'level-done': isLevelDone(getLevelByLevelAndLocation(level)),
                            'level_close': isCloseLevelShow(getLevelByLevelAndLocation(level))
                            }">




						<div :class="getLevelByLevelAndLocation(level) > 99 ? 'level__big' : ''">
							{{getLevelByLevelAndLocation(level)}}</div>
						<div class="menu__level_stars levels__stars">
							<div class="level_star" v-for="star in 3" :key="star"
								 :class="[
									 star <= stars[getLevelByLevelAndLocation(level)-1] ? 'menu-star ' : '',

									 ]">
								<div class="bg-star" v-if="star <= stars[getLevelByLevelAndLocation(level)-1]"
								:class="'bg-star' + randomStars[((level-1)*3) + star - 1]"></div>
							</div>
						</div>
						<div class="newElement"><div class="newElement__circle"></div></div>
					</div>


				</div>

				<div class="bottomHorizontalMenu">
					<div class="prev-location" @click="prevLocation()" :class="{closedGetLoc: location === 0}">
						<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>
					</div>
					<div
						class="levels__loc"
						:class="[location > 98 ? 'levels__loc_big' : '']"
						@click="toggleShowInfoAboutPageNumber"
					>{{location+1}}
					</div>
					<div class="next-location" @click="nextLocation()" :class="{closedGetLoc: location === allLocations-1 || !showNextLoc}">
						<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>
					</div>
				</div>

<!--				<div class="banner-wrapper">-->
<!--					<div id="yandex_rtb_R-A-518275-25"></div>-->
<!--				</div>-->

			</div>

			<div class="sideHorizontalMenu">
				<div class="switchSettings menuItem" @click="toggleSettings">
					<svg class="svgIcon" width="20" height="20" viewBox="0 0 20 20" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.56097 0.975609C7.56097 0.436796 7.99777 0 8.53658 0H11.4634C12.0022 0 12.439 0.436796 12.439 0.975609V2.33988C12.8703 2.48164 13.285 2.65998 13.6795 2.87122L14.6566 1.89414C15.0376 1.51314 15.6553 1.51314 16.0363 1.89414L18.1059 3.96372C18.4869 4.34472 18.4869 4.96245 18.1059 5.34344L17.0711 6.37823C17.0636 6.38566 17.0561 6.39294 17.0485 6.40008C17.2262 6.77249 17.3751 7.16119 17.4926 7.56333C17.5152 7.56177 17.538 7.56098 17.561 7.56098H19.0244C19.5632 7.56098 20 7.99777 20 8.53658V11.4634C20 12.0022 19.5632 12.439 19.0244 12.439H17.561C17.4852 12.439 17.4114 12.4304 17.3406 12.414C17.2088 12.7781 17.0506 13.1296 16.8684 13.4661C16.9409 13.5079 17.0091 13.5598 17.0711 13.6218L18.1059 14.6566C18.4869 15.0376 18.4869 15.6553 18.1059 16.0363L16.0363 18.1059C15.6553 18.4869 15.0376 18.4869 14.6566 18.1059L13.6218 17.0711C13.5336 16.9829 13.4659 16.8821 13.4185 16.7745C13.0813 16.939 12.7305 17.08 12.3681 17.1952C12.4139 17.3082 12.439 17.4316 12.439 17.561V19.0244C12.439 19.5632 12.0022 20 11.4634 20H8.53658C7.99777 20 7.56097 19.5632 7.56097 19.0244V17.561C7.56097 17.4316 7.58614 17.3082 7.63185 17.1952C7.26955 17.08 6.91871 16.939 6.5815 16.7745C6.53413 16.8821 6.46638 16.9829 6.37823 17.0711L5.34344 18.1059C4.96245 18.4869 4.34473 18.4869 3.96372 18.1059L1.89414 16.0363C1.51315 15.6553 1.51315 15.0376 1.89414 14.6566L2.92893 13.6218C2.9909 13.5598 3.05912 13.5079 3.13157 13.4661C2.94939 13.1296 2.79124 12.7781 2.65939 12.414C2.58857 12.4304 2.51481 12.439 2.43903 12.439H0.975609C0.436798 12.439 0 12.0022 0 11.4634V8.53658C0 7.99777 0.436798 7.56098 0.975609 7.56098H2.43903C2.462 7.56098 2.48479 7.56177 2.50736 7.56333C2.62486 7.16119 2.77384 6.7725 2.95148 6.40008C2.94387 6.39295 2.93636 6.38567 2.92893 6.37824L1.89414 5.34345C1.51315 4.96245 1.51315 4.34473 1.89414 3.96373L3.96372 1.89415C4.34473 1.51315 4.96245 1.51315 5.34344 1.89415L6.32052 2.87122C6.71496 2.65998 7.12967 2.48164 7.56097 2.33988V0.975609ZM10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"/></svg>
				</div>

				<div class="switchShop menuItem" @click="toggleShop()">
					<svg class="svgIcon" width="22" height="17" viewBox="0 0 22 17" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.33709 7.2C8.28468 7.2 10.6742 5.58823 10.6742 3.6C10.6742 1.61177 8.28468 0 5.33709 0C2.3895 0 0 1.61177 0 3.6C0 5.58823 2.3895 7.2 5.33709 7.2Z" /><path d="M5.33709 8.6C7.77026 8.6 9.82314 7.50171 10.4656 6C10.6014 6.31749 10.6742 6.65301 10.6742 7C10.6742 8.98822 8.28468 10.6 5.33709 10.6C2.3895 10.6 0 8.98822 0 7C0 6.65301 0.0727786 6.31749 0.208601 6C0.851035 7.50171 2.90391 8.6 5.33709 8.6Z" /><path d="M10.4656 9.2C9.82314 10.7017 7.77026 11.8 5.33709 11.8C2.90391 11.8 0.851035 10.7017 0.208601 9.2C0.0727786 9.51749 0 9.85301 0 10.2C0 12.1882 2.3895 13.8 5.33709 13.8C8.28468 13.8 10.6742 12.1882 10.6742 10.2C10.6742 9.85301 10.6014 9.51749 10.4656 9.2Z" /><path d="M5.33709 15C7.77026 15 9.82314 13.9017 10.4656 12.4C10.6014 12.7175 10.6742 13.053 10.6742 13.4C10.6742 15.3882 8.28468 17 5.33709 17C2.3895 17 0 15.3882 0 13.4C0 13.053 0.0727786 12.7175 0.208601 12.4C0.851035 13.9017 2.90391 15 5.33709 15Z" /><path d="M11.4649 14.2199C12.015 15.8131 14.1335 17 16.6629 17C19.6105 17 22 15.3882 22 13.4C22 13.053 21.9272 12.7175 21.7914 12.4C21.149 13.9017 19.0961 15 16.6629 15C14.43 15 12.5174 14.0751 11.7212 12.7622V12.8C11.7212 13.3 11.6305 13.7786 11.4649 14.2199Z" /><path d="M11.7212 11.5622C12.5174 12.8751 14.43 13.8 16.6629 13.8C19.6105 13.8 22 12.1882 22 10.2C22 9.85301 21.9272 9.51749 21.7914 9.2C21.149 10.7017 19.0961 11.8 16.6629 11.8C14.43 11.8 12.5174 10.8751 11.7212 9.56225V11.5622Z" /><path d="M11.7212 8.16225C12.5174 9.47508 14.43 10.4 16.6629 10.4C19.6105 10.4 22 8.78823 22 6.8C22 4.81177 19.6105 3.2 16.6629 3.2C14.1861 3.2 12.1034 4.33802 11.5012 5.88115C11.6437 6.29409 11.7212 6.7379 11.7212 7.2V8.16225Z" /></svg>
				</div>

				<div class="switchShowLocation menuItem" @click="toggleShowLocations" v-if="!notRussian">
					<svg class="svgIcon" width="28" height="22" viewBox="0 0 28 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M1.73723 16.9893V3.60855H0.715328C0.143066 3.60855 0 4.1575 0 4.43198V21.0036C0 22.074 1.0219 22.0672 1.53285 21.9299C3.9854 20.9418 9.50365 21.381 11.9562 21.7241C9.50365 19.3567 5.51825 19.3567 3.88321 19.1509C2.57518 18.9862 1.90754 17.6412 1.73723 16.9893Z"/><path d="M3.37226 0.932388C3.45401 0.108954 4.29197 -0.0282848 4.70073 0.00602489C10.1781 -0.158664 12.8418 3.0939 13.4891 4.74077L13.3869 20.9007C9.81022 17.2981 4.70073 17.504 4.18978 17.504C3.78102 17.504 3.47445 16.8864 3.37226 16.5776V0.932388Z"/><path d="M26.2628 16.9954V3.61458H27.2847C27.8569 3.61458 28 4.16353 28 4.43801V21.0096C28 22.0801 26.9781 22.0732 26.4672 21.936C24.0146 20.9479 18.4963 21.387 16.0438 21.7301C18.4963 19.3627 22.4818 19.3627 24.1168 19.1569C25.4248 18.9922 26.0925 17.6473 26.2628 16.9954Z"/><path d="M24.6277 0.938419C24.546 0.114985 23.708 -0.0222538 23.2993 0.0120559C17.8219 -0.152633 15.1582 3.09993 14.5109 4.7468L14.6131 20.9067C18.1898 17.3042 23.2993 17.51 23.8102 17.51C24.219 17.51 24.5255 16.8925 24.6277 16.5837V0.938419Z"/></svg>
					<div class="newElement">!</div>
				</div>

				<div class="createLevel menuItem" @click="toggleIsCreateGameWindow()" v-if="!notRussian">
					<svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M1.76337 14.8255L12.9366 3.70016C13.1735 3.46428 13.5575 3.46428 13.7944 3.70016L17.2839 7.1747C17.5208 7.41058 17.5208 7.79302 17.2839 8.0289L6.11073 19.1542C5.87384 19.3901 5.48976 19.3901 5.25286 19.1542L1.76337 15.6797C1.52648 15.4438 1.52648 15.0614 1.76337 14.8255Z"/><path d="M4.52596 19.6385L1.29214 16.4185C1.05791 16.1853 0.656847 16.316 0.606478 16.642L0.00483613 20.5359C-0.0372803 20.8085 0.202055 21.0416 0.474818 20.9937L4.31028 20.3198C4.63248 20.2631 4.75731 19.8688 4.52596 19.6385Z"/><path d="M16.4751 0.176764L14.2999 2.34262C14.0631 2.5785 14.0631 2.96094 14.2999 3.19682L17.7894 6.67136C18.0263 6.90724 18.4104 6.90724 18.6473 6.67136L20.8225 4.50551C21.0594 4.26963 21.0591 3.88689 20.8222 3.65101L17.3333 0.177057C17.0964 -0.0588234 16.712 -0.0591169 16.4751 0.176764Z"/></svg>
				</div>

				<div class="leaderBoard menuItem" @click="toggleLeaderBoard()" v-if="!notRussian">
					<svg class="svgIcon" width="22" height="18" viewBox="0 0 22 18" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.80626 0.657311C5.80626 0.294288 6.10055 0 6.46357 0H14.601C14.964 0 15.2583 0.294288 15.2583 0.657311V16.7614C15.2583 17.1245 14.964 17.4188 14.601 17.4188H6.46357C6.10055 17.4188 5.80626 17.1245 5.80626 16.7614V0.657311Z"/><path d="M16.8786 9.70424C16.8786 9.34122 17.1729 9.04693 17.5359 9.04693H20.9473C21.3104 9.04693 21.6047 9.34122 21.6047 9.70424V16.7614C21.6047 17.1244 21.3104 17.4187 20.9473 17.4187H17.5359C17.1729 17.4187 16.8786 17.1244 16.8786 16.7614V9.70424Z"/><path d="M0 5.38332C0 5.0203 0.294288 4.72601 0.657311 4.72601H3.52859C3.89161 4.72601 4.1859 5.0203 4.1859 5.38332V16.7614C4.1859 17.1245 3.89161 17.4187 3.52859 17.4187H0.657312C0.294289 17.4187 0 17.1245 0 16.7614V5.38332Z"/><path class="leaderboardStarIcon" d="M10.7837 1.77475L11.3749 3.59415H13.2879L11.7403 4.71861L12.3314 6.53801L10.7837 5.41356L9.23605 6.53801L9.82721 4.71861L8.27954 3.59415H10.1926L10.7837 1.77475Z" fill="white"/></svg>
				</div>
			</div>


		</div>


		<div class="blurBackground" v-if="showLocations" @click="toggleShowLocations"></div>

		<div class="popUp" v-if="showLocations">
			<div class="popUp__header">
				<div class="popUp__title">Локации</div>
				<div class="popUp__close" @click="toggleShowLocations"></div>
			</div>
			<div class="popUp__elements">



				<div
					class="popUp__location"
					v-for="loc in allLocationsNames"
					:class="[loc + 'Location',
					         blockedLocations.includes(loc) ? 'popUp__location_blocked' : '']"
					@click="openGameLocation(loc)"
					v-if="!(blockedLocations.includes(loc) && platformBuild === 'gp')"
				>
					<div class="popUp__locationPicture">
						<div class="popUp__locationStars">
							{{getLocationAllStarsByLocation(loc)}}/{{loc === 'event' ? eventLocationWordsAMount*3 : 60}}
						</div>
						<div
							class="popUp__locationPicture__blackout"
							v-if="blockedLocations.includes(loc)"
						>
						</div>
						<div
							class="popUp__location__open shop__cart__buy-button"
							v-if="blockedLocations.includes(loc)"
							@click="buyTip('location_' + loc)"
						>
							Открыть {{getItemPrice(5)}}
						</div>
					</div>
					<div class="popUp__locationName" v-html="getLocationName(loc)"></div>
				</div>



			</div>


		</div>


		<div class="rules-blackout" v-if="levelClosedShow" @click="toggleLevelClosedShow"></div>

		<div class="rules" v-if="levelClosedShow">
			<cross-vue @click.native="toggleLevelClosedShow()" ></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Level closed' : 'Уровень закрыт'}}
			</h2>
			<div class="levelClosedText">
				{{notRussian ?
				'Complete the level' + closedLevel + ' by at least one star to unlock the level ' + (closedLevel+1) + '. Good luck!' :
				'Пройдите уровень ' + closedLevel + ' хотя бы на одну звезду, чтобы открыть уровень ' + (closedLevel+1) + '. Удачной игры!'
				}}
			</div>

		</div>

		<div class="rules-blackout" v-if="showBgChanger" @click="toggleBgChanger"></div>

		<div class="rules bgChanger" v-if="showBgChanger">
			<cross-vue @click.native="toggleBgChanger()" ></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Change design' : 'Смена оформления'}}
			</h2>

			<div class="changeDesign">
				<div class="changeLeft" @click="changeBgLeft"></div>

				<div class="chosenBg" :class="'chosenBg' + chosenBg">
					<div class="closedBg" v-if="cantShowBg">
						{{notRussian?
						'The background will open at level ' + (bgLvlsOpen[chosenBg-1]+1)
						:
						'Фон откроется на ' + (bgLvlsOpen[chosenBg-1]+1) +' уровне'
						}}

					</div>
				</div>

				<div class="changeRight" @click="changeBgRight"></div>
			</div>

		</div>


		<div class="rules-blackout" v-if="showInfoAboutStars" @click="toggleShowInfoAboutStars"></div>

		<div class="rules" v-if="showInfoAboutStars">
			<cross-vue @click.native="toggleShowInfoAboutStars()" ></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Amount of stars' : 'Количество звёзд'}}
			</h2>
			<div class="levelClosedText">
				{{notRussian ?
				'The first number is the amount of earned stars. The second number is the total number of stars that you can earn. There are more stars with each page!' :
				'Первое число -  количество заработанных звёзд. Второе число -  общее количество звёзд, которые можно получить. С каждой страницей звёзд всё больше!'
				}}
			</div>

		</div>



		<div class="blackout" v-if="showInfoAboutPageNumber" @click="toggleShowInfoAboutPageNumber"></div>

		<div class="rules pageNumInfo" v-if="showInfoAboutPageNumber">
			<cross-vue @click.native="toggleShowInfoAboutPageNumber()" ></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Page number' : 'Номер страницы'}}
			</h2>
			<template v-if="gameLastLocation > 1">
				<div class="pageNumVal">{{pageNumVal}}</div>
				<input
					class="pageNumInput"
					v-model="pageNumVal"
					type="range"
					min="1"
					v-bind:max="gameLastLocation"
					step="1"
					@change="changePageNum"
				/>
			</template>
			<template v-else>
				{{
					notRussian ?
						'Later you will be able to navigate through the pages using this window' :
						'Позже вы сможете перемещаться по страницам, используя это окно'
				}}

			</template>
		</div>


		<div class="rules-blackout" v-if="showInfoAboutPortrait" @click="toggleShowInfoAboutPortrait"></div>

		<div class="rules" v-if="showInfoAboutPortrait">
			<cross-vue @click.native="toggleShowInfoAboutPortrait()" ></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Advise' : 'Совет'}}
			</h2>
			<div class="levelClosedText">
				{{notRussian ?
				'You can play in vertical and horizontal orientation. Have a good game!' :
				'В игру можно играть и в вертикальном, и в горизонтальном положении. Хорошей Вам игры!'
				}}
			</div>

		</div>

		<div class="rules-blackout" v-if="isCreateGameWindow" @click="toggleIsCreateGameWindow"></div>

		<div class="rules createGameRules" v-if="isCreateGameWindow">
			<cross-vue @click.native="toggleIsCreateGameWindow()" ></cross-vue>
			<h2 class="rules__menu">
				{{gameWindowForTwo ? 'Друг против друга' : 'Создание уровня'}}
			</h2>
			<div class="createGame-wrapper">
				<template v-if="gameWindowForTwo">
					<div class="gameForTwo__miniHeader">
						Длина слова
					</div>
					<div class="form-select">
						<select v-model="gameSelectedSize">
							<option v-for="option in sizeOptions" :value="option.value">
								{{ option.text }}
							</option>
						</select>
					</div>
					<div class="gameForTwo__miniHeader">
						Время на ход
					</div>
					<div class="form-select">
						<select v-model="gameSelectedTime">
							<option v-for="option in timeOptions" :value="option.value">
								{{ option.text }}
							</option>
						</select>
					</div>
				</template>
				<div class="gameWordMistake" v-show="gameWordMistake">
					<span >Пожалуйста, введите слово от 5 до 12 букв в русской раскладке</span>
				</div>
				<div class="levelInput-wrapper">
					<input
						class="createLevelInput"
						v-model="gameWord"
						type="text"
						placeholder="Введите своё слово"
					/>
					<div class="levelInput__icon" @click="getRandomWord">
						<svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M1.76337 14.8255L12.9366 3.70016C13.1735 3.46428 13.5575 3.46428 13.7944 3.70016L17.2839 7.1747C17.5208 7.41058 17.5208 7.79302 17.2839 8.0289L6.11073 19.1542C5.87384 19.3901 5.48976 19.3901 5.25286 19.1542L1.76337 15.6797C1.52648 15.4438 1.52648 15.0614 1.76337 14.8255Z"/><path d="M4.52596 19.6385L1.29214 16.4185C1.05791 16.1853 0.656847 16.316 0.606478 16.642L0.00483613 20.5359C-0.0372803 20.8085 0.202055 21.0416 0.474818 20.9937L4.31028 20.3198C4.63248 20.2631 4.75731 19.8688 4.52596 19.6385Z"/><path d="M16.4751 0.176764L14.2999 2.34262C14.0631 2.5785 14.0631 2.96094 14.2999 3.19682L17.7894 6.67136C18.0263 6.90724 18.4104 6.90724 18.6473 6.67136L20.8225 4.50551C21.0594 4.26963 21.0591 3.88689 20.8222 3.65101L17.3333 0.177057C17.0964 -0.0588234 16.712 -0.0591169 16.4751 0.176764Z"/></svg>
					</div>
				</div>
				<div class="createGame__action">
					<div class="startCreateGame startCreateGame_continue" @click="startCreateGame(true)"
						 v-show="gameWindowForTwo ? gameForTwoState : savedMyGame">Продолжить</div>
					<div class="startCreateGame" @click="startCreateGame(false)">Создать игру</div>
				</div>

			</div>

		</div>

		<div class="rules-blackout blackoutInfoCreateGame" v-if="isInfoAboutCreateGame" @click="toggleIsInfoAboutCreateGame"></div>

		<div class="rules infoCreateGame" v-if="isInfoAboutCreateGame">
			<cross-vue @click.native="toggleIsInfoAboutCreateGame()" ></cross-vue>
			<h2 class="rules__menu">
				Описание
			</h2>
			<p v-if="isInfoAboutGameForTwo">Создайте уровень из любого слова и соревнуйтесь друг с другом на время!
				Игра заканчивается, если вы отгадали все слова или один из игроков пропустил ход два раза. Удачной игры!</p>
			<p v-else>Здесь Вы можете создать свой уровень из любого слова, которое придумаете.
				Вы можете тратить подсказки, но не будете зарабатывать их за получение звёзд. Удачной игры!</p>
		</div>

		<div class="rules-blackout" v-if="isLeaderBoard" @click="toggleLeaderBoard()"></div>

		<div class="rules rules_lb" v-if="isLeaderBoard">
			<cross-vue @click.native="toggleLeaderBoard()" ></cross-vue>
			<h2 class="rules__menu black-friday">
				{{notRussian ? 'Rating' : 'Рейтинг'}}
			</h2>
			<div class="leaderBoardInfo">
				<template v-if="leaderBoard">
					<div
						class="leaderBoardInfo__player"
						v-for="player in leaderBoard"
						:class="[
							getPlayerRank(player) < 21 ? 'leaderBoardInfo_' + getPlayerRank(player) : '',
							 playerRait && getPlayerRank(playerRait) === getPlayerRank(player) ? 'leaderBoardInfo_mine' : '',
							 getPlayerRank(player) === 20 ? 'lastRang' : ''
							 ]"
					>
							<div class="leaderBoardInfo__playerInfo">
								<div class="leaderBoardInfo__firstBlock">
									<div class="leaderBoardInfo__image"
										 :style="{background: 'url(' + getPlayerAvatar(player) + ') center center no-repeat'}"
										 :class="[getPlayerAvatar(player) ? '' : 'leaderBoardInfo__image_no']">
									</div>
									<div class="leaderBoardInfo__nameAndScore">
										<div class="leaderBoardInfo__name">{{getPlayerName(player)}}</div>
										<div class="leaderBoardInfo__score">Звёзд: {{ player.score }}</div>
									</div>
								</div>
								<div
									class="leaderBoardInfo__rank"
									:class="getPlayerRank(player) > 20 ? 'leaderBoardInfo_big' : ''"
								>
									<div class="leaderBoardInfo__rankInner"
										 :class="getPlayerRank(player) > 99999 ? 'leaderBoardInfo__rankInner_bigRank' : ''"
									>
										{{getPlayerRank(player)}}
									</div>
								</div>
							</div>


					</div>
				</template>


				<template v-else>
					<div class="settings__text authText" @click="getAuth">
						{{notRussian ? 'Rating is loading' : 'Рейтинг загружается, подождите...'}}

					</div>
				</template>

			</div>

		</div>


		<div class="blurBackground gamePaused__blurBackground" v-if="gamePaused" @click="toggleGamePause"></div>
		<div class="gamePaused" v-if="gamePaused" @click="toggleGamePause">
			<div :class="gameForTwoState.firstPlayerMove ? '' : 'gameForTwo__player2'">
				<div class="gameForTwo__icon"></div>
			</div>
			<div class="gamePaused__move" v-show="isGameTimeout">
				Время вышло!
			</div>
			<div class="gamePaused__move">
				Ход игрока #{{gameForTwoState.firstPlayerMove ? 1 : 2}}
			</div>
			<div class="gamePaused__continue">
				Нажмите на экран, чтобы продолжить
			</div>
		</div>


		<!--Блок с локацией-->
		<div
			class="location"
			:class="[
				'gameLocation-' + locationClassID,
				 levelsAnim ? 'levelsAnim' : '',
				 eventLocation ? 'eventGameLocation' : ''
				 ]"
			v-show="showGameLocation"
		>
			<div class="levelsTop">
				<div class="levelsTop__allStars" :class="[notRussian ? 'levelsTop__allStars_withoutLB' : '']">
					{{locationAllStars}}/{{eventLocation ? eventLocationWordsAMount*3 : 60}}
				</div>
			</div>

				<div
					class="eventProperty"
					v-if="eventLocation"
				>
					<div
						class="levels-wrapper"
					>
						<div
							class="level"
							v-for="level in eventLocationWordsAMount"
							:key="'event' + level"
							@click="getLocationLevel(level-1)"
							:class="getLocationLevelClasses(level)"
						>




							<div :class="level > 99 ? 'level__big' : ''">{{level}}</div>
							<div class="newElement" v-if="lastLocationLevel === level"><div class="newElement__circle"></div></div>
							<div class="menu__level_stars">

								<div class="level_star" v-for="star in 3" :key="star"
									 :class="star <= locationStars[level-1] ? 'menu-star' : ''"></div>
							</div>
						</div>


					</div>
				</div>

				<div
					class="level location__level"
					v-for="level in 20"
					:key="'location-level-' + level"
					:class="getLocationLevelClasses(level)"
					:style="getLocationStyles(level)"
					@click="getLocationLevel(level-1)"
					v-else
				>
					<div>{{level}}</div>
					<div class="newElement" v-if="lastLocationLevel === level"><div class="newElement__circle"></div></div>
					<div class="menu__level_stars">

						<div class="level_star" v-for="star in 3" :key="star"
							 :class="[
								 star <= locationStars[level-1] ? 'menu-star' : ''
								 ]"></div>
					</div>
				</div>


			<div class="sideHorizontalMenu">
				<div class="menu__button-back menuItem" @click="backMenu">
					<svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.6255 0.700921C9.6294 0.704508 9.6354 0.704507 9.6393 0.700921L10.0169 0.353633C10.2342 0.153729 10.5685 0.153729 10.7858 0.353633L19.786 8.63225C20.2443 9.05379 20.2443 9.77702 19.786 10.1986C19.5266 10.4372 19.1783 10.5238 18.8543 10.4584V19C18.8543 20.1046 17.9589 21 16.8543 21H13V15.5C13 14.1193 11.8807 13 10.5 13C9.11927 13 7.99999 14.1193 7.99999 15.5V21H3.80269C2.69812 21 1.80269 20.1046 1.80269 19V10.5808C1.47324 10.6538 1.11605 10.5686 0.851402 10.3251C0.39312 9.9036 0.39312 9.18037 0.851402 8.75883L9.46756 0.833511L9.4759 0.82223L9.4779 0.824005L9.61171 0.700921C9.61561 0.697335 9.6216 0.697335 9.6255 0.700921Z"/></svg>
				</div>
				<div v-if="!eventLocation" class="switchShowLocation menuItem" @click="toggleShowLocations">
					<svg class="svgIcon" width="28" height="22" viewBox="0 0 28 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M1.73723 16.9893V3.60855H0.715328C0.143066 3.60855 0 4.1575 0 4.43198V21.0036C0 22.074 1.0219 22.0672 1.53285 21.9299C3.9854 20.9418 9.50365 21.381 11.9562 21.7241C9.50365 19.3567 5.51825 19.3567 3.88321 19.1509C2.57518 18.9862 1.90754 17.6412 1.73723 16.9893Z"/><path d="M3.37226 0.932388C3.45401 0.108954 4.29197 -0.0282848 4.70073 0.00602489C10.1781 -0.158664 12.8418 3.0939 13.4891 4.74077L13.3869 20.9007C9.81022 17.2981 4.70073 17.504 4.18978 17.504C3.78102 17.504 3.47445 16.8864 3.37226 16.5776V0.932388Z"/><path d="M26.2628 16.9954V3.61458H27.2847C27.8569 3.61458 28 4.16353 28 4.43801V21.0096C28 22.0801 26.9781 22.0732 26.4672 21.936C24.0146 20.9479 18.4963 21.387 16.0438 21.7301C18.4963 19.3627 22.4818 19.3627 24.1168 19.1569C25.4248 18.9922 26.0925 17.6473 26.2628 16.9954Z"/><path d="M24.6277 0.938419C24.546 0.114985 23.708 -0.0222538 23.2993 0.0120559C17.8219 -0.152633 15.1582 3.09993 14.5109 4.7468L14.6131 20.9067C18.1898 17.3042 23.2993 17.51 23.8102 17.51C24.219 17.51 24.5255 16.8925 24.6277 16.5837V0.938419Z"/></svg>
				</div>
				<div v-if="eventLocation" class="leaderBoard menuItem" @click="toggleLeaderBoard(true)">
					<svg class="svgIcon" width="22" height="18" viewBox="0 0 22 18" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.80626 0.657311C5.80626 0.294288 6.10055 0 6.46357 0H14.601C14.964 0 15.2583 0.294288 15.2583 0.657311V16.7614C15.2583 17.1245 14.964 17.4188 14.601 17.4188H6.46357C6.10055 17.4188 5.80626 17.1245 5.80626 16.7614V0.657311Z"/><path d="M16.8786 9.70424C16.8786 9.34122 17.1729 9.04693 17.5359 9.04693H20.9473C21.3104 9.04693 21.6047 9.34122 21.6047 9.70424V16.7614C21.6047 17.1244 21.3104 17.4187 20.9473 17.4187H17.5359C17.1729 17.4187 16.8786 17.1244 16.8786 16.7614V9.70424Z"/><path d="M0 5.38332C0 5.0203 0.294288 4.72601 0.657311 4.72601H3.52859C3.89161 4.72601 4.1859 5.0203 4.1859 5.38332V16.7614C4.1859 17.1245 3.89161 17.4187 3.52859 17.4187H0.657312C0.294289 17.4187 0 17.1245 0 16.7614V5.38332Z"/><path d="M10.7837 1.77475L11.3749 3.59415H13.2879L11.7403 4.71861L12.3314 6.53801L10.7837 5.41356L9.23605 6.53801L9.82721 4.71861L8.27954 3.59415H10.1926L10.7837 1.77475Z" fill="white"/></svg>
				</div>
				<div v-if="!eventLocation" class="switchShop menuItem" @click="toggleShop()">
					<svg class="svgIcon" width="22" height="17" viewBox="0 0 22 17" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.33709 7.2C8.28468 7.2 10.6742 5.58823 10.6742 3.6C10.6742 1.61177 8.28468 0 5.33709 0C2.3895 0 0 1.61177 0 3.6C0 5.58823 2.3895 7.2 5.33709 7.2Z" /><path d="M5.33709 8.6C7.77026 8.6 9.82314 7.50171 10.4656 6C10.6014 6.31749 10.6742 6.65301 10.6742 7C10.6742 8.98822 8.28468 10.6 5.33709 10.6C2.3895 10.6 0 8.98822 0 7C0 6.65301 0.0727786 6.31749 0.208601 6C0.851035 7.50171 2.90391 8.6 5.33709 8.6Z" /><path d="M10.4656 9.2C9.82314 10.7017 7.77026 11.8 5.33709 11.8C2.90391 11.8 0.851035 10.7017 0.208601 9.2C0.0727786 9.51749 0 9.85301 0 10.2C0 12.1882 2.3895 13.8 5.33709 13.8C8.28468 13.8 10.6742 12.1882 10.6742 10.2C10.6742 9.85301 10.6014 9.51749 10.4656 9.2Z" /><path d="M5.33709 15C7.77026 15 9.82314 13.9017 10.4656 12.4C10.6014 12.7175 10.6742 13.053 10.6742 13.4C10.6742 15.3882 8.28468 17 5.33709 17C2.3895 17 0 15.3882 0 13.4C0 13.053 0.0727786 12.7175 0.208601 12.4C0.851035 13.9017 2.90391 15 5.33709 15Z" /><path d="M11.4649 14.2199C12.015 15.8131 14.1335 17 16.6629 17C19.6105 17 22 15.3882 22 13.4C22 13.053 21.9272 12.7175 21.7914 12.4C21.149 13.9017 19.0961 15 16.6629 15C14.43 15 12.5174 14.0751 11.7212 12.7622V12.8C11.7212 13.3 11.6305 13.7786 11.4649 14.2199Z" /><path d="M11.7212 11.5622C12.5174 12.8751 14.43 13.8 16.6629 13.8C19.6105 13.8 22 12.1882 22 10.2C22 9.85301 21.9272 9.51749 21.7914 9.2C21.149 10.7017 19.0961 11.8 16.6629 11.8C14.43 11.8 12.5174 10.8751 11.7212 9.56225V11.5622Z" /><path d="M11.7212 8.16225C12.5174 9.47508 14.43 10.4 16.6629 10.4C19.6105 10.4 22 8.78823 22 6.8C22 4.81177 19.6105 3.2 16.6629 3.2C14.1861 3.2 12.1034 4.33802 11.5012 5.88115C11.6437 6.29409 11.7212 6.7379 11.7212 7.2V8.16225Z" /></svg>
				</div>
				<div v-if="eventLocation" class="menuItem" @click="toggleRules()">
					<svg class="svgIcon" width="16" height="27" viewBox="0 0 16 27" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.375 18.8885V18.6591C5.3911 17.1619 5.54001 15.9706 5.82173 15.0852C6.11151 14.1998 6.52202 13.4834 7.05327 12.9361C7.58452 12.3887 8.22443 11.8897 8.97301 11.4389C9.45597 11.133 9.89063 10.791 10.277 10.4126C10.6634 10.0343 10.9692 9.59967 11.1946 9.10866C11.42 8.61766 11.5327 8.07434 11.5327 7.47869C11.5327 6.76231 11.3636 6.14252 11.0256 5.61932C10.6875 5.09612 10.2367 4.69365 9.6733 4.41193C9.1179 4.12216 8.49811 3.97727 7.81392 3.97727C7.19413 3.97727 6.60251 4.10606 6.03906 4.36364C5.47562 4.62121 5.00876 5.02367 4.63849 5.57102C4.26823 6.11032 4.05492 6.80658 3.99858 7.6598H0.328125C0.38447 6.21094 0.75071 4.98745 1.42685 3.98935C2.10298 2.98319 2.99645 2.22254 4.10724 1.70738C5.22609 1.19223 6.46165 0.934658 7.81392 0.934658C9.29498 0.934658 10.5909 1.21236 11.7017 1.76776C12.8125 2.3151 13.6738 3.08381 14.2855 4.07386C14.9053 5.05587 15.2152 6.20289 15.2152 7.51491C15.2152 8.41643 15.0743 9.2294 14.7926 9.95383C14.5109 10.6702 14.1084 11.3101 13.5852 11.8736C13.0701 12.437 12.4503 12.9361 11.7259 13.3707C11.0417 13.7973 10.4863 14.2401 10.0597 14.6989C9.6411 15.1577 9.33523 15.701 9.14205 16.3288C8.94886 16.9567 8.84422 17.7334 8.82812 18.6591V18.8885H5.375ZM7.19815 26.2294C6.53812 26.2294 5.97064 25.996 5.49574 25.5291C5.02083 25.0542 4.78338 24.4827 4.78338 23.8146C4.78338 23.1546 5.02083 22.5911 5.49574 22.1243C5.97064 21.6494 6.53812 21.4119 7.19815 21.4119C7.85014 21.4119 8.41359 21.6494 8.88849 22.1243C9.37145 22.5911 9.61293 23.1546 9.61293 23.8146C9.61293 24.2573 9.50024 24.6638 9.27486 25.0341C9.05753 25.3963 8.76776 25.6861 8.40554 25.9034C8.04332 26.1207 7.64086 26.2294 7.19815 26.2294Z"/></svg>
				</div>
				<div v-if="eventLocation" class="menuItem" @click="toggleIsEventResult()">
					<<svg class="svgIcon" width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9375 16.7257C12.9375 16.2738 13.3153 15.9074 13.7812 15.9074H21.75C22.216 15.9074 22.5937 16.2738 22.5937 16.7257V28.1817C22.5937 28.6336 22.216 29 21.75 29H13.7812C13.3153 29 12.9375 28.6336 12.9375 28.1817V16.7257Z" /><path d="M12.9375 10.764C12.9375 10.3121 13.3153 9.94572 13.7812 9.94572H23.1562C23.6222 9.94572 24 10.3121 24 10.764V14.219C24 14.6709 23.6222 15.0373 23.1562 15.0373H13.7812C13.3153 15.0373 12.9375 14.6709 12.9375 14.219V10.764Z" /><path d="M14.4375 1.99016C13.6875 2.863 12.5 6.08159 12 7.58178V9.4002C21.1875 9.4002 22.5 6.08159 22.5469 4.94509C22.5937 3.80858 20.625 0.990037 18.6562 0.217211C16.6875 -0.555614 15.375 0.899116 14.4375 1.99016Z" /><path d="M11.0625 16.7257C11.0625 16.2738 10.6847 15.9074 10.2187 15.9074H2.25C1.78401 15.9074 1.40625 16.2738 1.40625 16.7257V28.1817C1.40625 28.6336 1.78401 29 2.25 29H10.2187C10.6847 29 11.0625 28.6336 11.0625 28.1817V16.7257Z" /><path d="M11.0625 10.764C11.0625 10.3121 10.6847 9.94572 10.2187 9.94572H0.84375C0.37776 9.94572 0 10.3121 0 10.764V14.219C0 14.6709 0.37776 15.0373 0.84375 15.0373H10.2187C10.6847 15.0373 11.0625 14.6709 11.0625 14.219V10.764Z" /><path d="M9.5625 1.99016C10.3125 2.863 11.5 6.08159 12 7.58178V9.4002C2.8125 9.4002 1.5 6.08159 1.45312 4.94509C1.40625 3.80858 3.375 0.990037 5.34375 0.217211C7.3125 -0.555614 8.625 0.899116 9.5625 1.99016Z" /></svg>

				</div>
			</div>





		</div>








		<div class="game"  :class="[
			'game_locationDesign_' + gameLocation,
			levelsAnim ? 'gameAnim' : ''
			]" v-show="content">
			<div class="blur"></div>
			<div class="blackoutShowNextAdv" v-show="isShowTimeToShowNextAdv && !notShowAdvPause"></div>
			<div class="timeToShowNextAdv" v-show="isShowTimeToShowNextAdv" :class="notShowAdvPause ? 'timeToShowNextAdv_noPause' : ''">
				<svg class="noAdvert__advert" width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.133268 7.31339C0.0458686 7.33307 -0.0127351 7.42047 0.00237327 7.50861L1.042 13.5734C1.0571 13.6616 1.1402 13.7171 1.2276 13.6974L2.59532 13.3894V33.8381C2.59532 33.9275 2.66795 34 2.75755 34H35.8378C35.9274 34 36 33.9275 36 33.8381V11.1405C36 11.0511 35.9274 10.9786 35.8378 10.9786H13.302L33.6892 6.38798C33.7766 6.3683 33.8352 6.2809 33.8201 6.19276L32.7805 0.127919C32.7653 0.0397812 32.6822 -0.0157149 32.5948 0.00396503L0.133268 7.31339ZM15.144 26.46L24.6242 22.6755L15.144 18.891V26.46Z" fill="url(#paint0_linear_48_33541)"/><defs><linearGradient id="paint0_linear_48_33541" x1="36" y1="-3" x2="3" y2="34" gradientUnits="userSpaceOnUse"><stop/><stop offset="0.994865" stop-color="#5E5E5E"/></linearGradient></defs></svg>
				<div class="timeToShowNextAdv__time">{{timeToShowNextAdv}}</div>
			</div>

			<header class="menu" :class="[isTutorial ? 'tutorialMenu' : '', verticalPayload ? 'menu_verticalPayload': '']">

				<button
					class="menu__button-back menuItem"
					@click="backMenu"
					v-show="!verticalPayload"
				>
					<svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.6255 0.700921C9.6294 0.704508 9.6354 0.704507 9.6393 0.700921L10.0169 0.353633C10.2342 0.153729 10.5685 0.153729 10.7858 0.353633L19.786 8.63225C20.2443 9.05379 20.2443 9.77702 19.786 10.1986C19.5266 10.4372 19.1783 10.5238 18.8543 10.4584V19C18.8543 20.1046 17.9589 21 16.8543 21H13V15.5C13 14.1193 11.8807 13 10.5 13C9.11927 13 7.99999 14.1193 7.99999 15.5V21H3.80269C2.69812 21 1.80269 20.1046 1.80269 19V10.5808C1.47324 10.6538 1.11605 10.5686 0.851402 10.3251C0.39312 9.9036 0.39312 9.18037 0.851402 8.75883L9.46756 0.833511L9.4759 0.82223L9.4779 0.824005L9.61171 0.700921C9.61561 0.697335 9.6216 0.697335 9.6255 0.700921Z"/></svg>
				</button>
				<template v-if="isGameForTwo">
					<div class="gameForTwo">
						<div class="gameForTwo__player1"  :class="!gameForTwoState.firstPlayerMove ? 'gameForTwo__gray' : ''">
							<div class="gameForTwo__icon">
								<div class="gameForTwo__stars">
									<div class="level_star level_full-star"></div>
									{{gameForTwoState.firstPlayer.words.reduce((acc, c)=>acc+c.length, 0)}}
								</div>
							</div>
						</div>
						<div class="gameForTwo__time">
							{{gameTimerInText}}
							<div class="gameForTwo__move">
								Ход игрока #{{gameForTwoState.firstPlayerMove ? 1 : 2}}
							</div>
						</div>
						<div class="gameForTwo__player2" :class="gameForTwoState.firstPlayerMove ? 'gameForTwo__gray' : ''">
							<div class="gameForTwo__icon">
								<div class="gameForTwo__stars">
									<div class="level_star level_full-star"></div>
									{{gameForTwoState.secondPlayer.words.reduce((acc, c)=>acc+c.length, 0)}}
								</div>
							</div>
						</div>
					</div>

					<div
						class="menuItem gameForTwo__pause"
						@click="toggleGamePause"
					>
						<svg class="svgIcon" width="12" height="16" viewBox="0 0 12 16" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="16" rx="1"/><rect x="8" width="4" height="16" rx="1"/></svg>
					</div>
				</template>
				<template v-else>
					<div
						class="menu__words-amount"
						v-show="!verticalPayload"
					>
						<div class="words-amount__first">{{doneWords.length}}</div>
						<div class="words-amount__second">{{nowWords.length}}</div>
						<div class="menu__hint">{{notRussian ? 'Guessed' : 'Отгадано'}}</div>
					</div>
					<div class="menu__level">
						{{notRussian ? 'Lvl' : 'Ур.'}} {{lvl+1}}
						<div class="menu__level_stars">
							<div
								class="level_star"
								v-for="star in 3"
								:key="star"
								:class="[
								 star <= levelStars ? 'level_full-star' : '',
                      			 getStar === star ? 'getStar' : ''
                      			 ]"
							>
								<div v-if="star <= levelStars" class="bg-star" :class="'bg-star' + randomLevelStars[star-1]"></div>
							</div>
						</div>
						<div class="menu__hint">{{moreGuessedWords}}</div>
					</div>
					<div
						class="menu__tip menuItem"
						@click="getTip()"
						:class="[selectTip ? 'tutorialSelected' : '']"
					>
						<svg class="svgIcon" width="15" height="23" viewBox="0 0 15 23" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M8.80952 22.0417C8.70168 22.5783 8.16247 23 7.5 23C6.83754 23 6.29832 22.5783 6.19048 22.0417H8.80952Z" /><path d="M9.66096 20.2853L5.24123 20.2725C5.22789 20.2736 5.21455 20.2747 5.18787 20.2769C5.07895 20.2589 4.97789 20.1726 4.96802 20.0518C4.95815 19.931 5.03051 19.8304 5.14838 19.7936C5.16172 19.7925 5.17507 19.7914 5.20175 19.7892L9.60813 19.8031C9.74154 19.7921 9.85703 19.8906 9.868 20.0249C9.87897 20.1591 9.79436 20.2742 9.66096 20.2853Z" /><path d="M5.15316 20.9796C5.16639 20.9785 5.17962 20.9774 5.20607 20.9753L9.57506 20.9922C9.70732 20.9813 9.82191 21.0799 9.83288 21.2142C9.84384 21.3484 9.74681 21.4645 9.61454 21.4755L5.23233 21.4596C5.2191 21.4607 5.20587 21.4618 5.17942 21.464C5.07141 21.4459 4.97115 21.3596 4.96128 21.2388C4.95141 21.118 5.03522 21.0029 5.15316 20.9796Z" /><path d="M5.27194 18.2083H9.72806C10.0099 18.2083 10.2381 18.4227 10.2381 18.6875C10.2381 18.9523 10.0099 19.1667 9.72806 19.1667H5.27194C4.99008 19.1667 4.76191 18.9523 4.76191 18.6875C4.76191 18.4227 4.99008 18.2083 5.27194 18.2083Z" /><path d="M7.4599 0C7.4733 0 7.4733 0 7.48669 0C7.50008 0 7.50008 0 7.51347 0C11.6518 0 15 3.40946 15 7.62354C15 10.5829 13.192 12.8332 11.1295 14.7425C10.3126 15.5062 9.83041 16.5972 9.83041 17.7292H7.52687C7.52687 17.7292 7.51347 17.7292 7.50008 17.7292C7.48669 17.7292 7.47329 17.7292 7.47329 17.7292H5.16975C5.16975 16.5836 4.68761 15.4926 3.87066 14.7425C1.80818 12.8332 0.000160217 10.5966 0.000160217 7.62354C-0.0266256 3.42309 3.32156 0 7.4599 0Z" /></svg>

						<div class="advert" v-if="tipCount === 0 && advTimer <= 0">+2</div>
						<div class="menu__tip_count" v-else>
							<template v-if="advTimer > 0 && tipCount === 0">
								{{advTimerTime}}
							</template>
							<template v-else>
								{{lvl === 0 && !locationGame ? '∞' : tipCount}}
							</template>

						</div>
					</div>
					<div class="nextAndPrevLevel">
						<div class="menu__button-next-level menuItem menu__button-prev-level"
							 :class="[lvl === 0 ? 'menu__button-next-level_notActive' : 'menu__button-next-level_active']"
							 @click="prevLevel()"
							 v-show="!verticalPayload"
						>
							<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>
						</div>

						<div class="menu__button-next-level menuItem"
							 :class="[!testShowNextLevel() ? 'menu__button-next-level_notActive' : 'menu__button-next-level_active']"
							 @click="nextLevel()"
							 v-show="!verticalPayload"
						>
							<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>


							<div class="menu__hint" v-if="lvl < 4">{{notRussian ? 'Earn 1 star and get access to the next level' : 'Заработайте 1 звезду и получите доступ к следующему уровню'}}</div>
						</div>
					</div>

					<div class="portraitButton menu__button-next-level menuItem menu__button-prev-level"
						 :class="[lvl === 0 ? 'menu__button-next-level_notActive' : 'menu__button-next-level_active']"
						 @click="prevLevel()"
						 v-show="!verticalPayload"
					>
						<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>
					</div>

					<div class="portraitButton menu__button-next-level menuItem"
						 :class="[!testShowNextLevel() ? 'menu__button-next-level_notActive' : 'menu__button-next-level_active']"
						 @click="nextLevel()"
						 v-show="!verticalPayload"
					>
						<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>


						<div class="menu__hint" v-if="lvl < 4">{{notRussian ? 'Earn 1 star and get access to the next level' : 'Заработайте 1 звезду и получите доступ к следующему уровню'}}</div>
					</div>
				</template>


			</header>



			<div class="property">
				<div></div>






				<div class="words">
					<div class="words__letters-block"
						 v-for="(word,index) in nowWords"
						 :key = "word"
						 :class="[doneWords.includes(word) ? 'words__letters-block_done' : '',
               animWord === word ? 'animWord' : '',
                animWordStart === word ? 'animWordStart' : '',
                newWord === word ? 'newWord' : '',
                wordWasIndex === index ? 'wordWas': '',
                selectMainWord === word ? 'tutorialSelected' : ''
                ]"
						 @click="openWordDescription(word)"
					>
						<div class="words__letter"
							 v-for="(letter, ind) in word"
							 :key = "word + ind + letter"
						>
							{{doneWords.includes(word) ? letter : '' }}
						</div>
					</div>

					<div class="words__letters-block words__letters-block_done"
						 @click="openMainWordDescription"
					>
						<div class="words__letter"
							 v-for="(letter, ind) in letters"
							 :key = "'mainWord' + ind"
						>
							{{letter}}
						</div>
					</div>



					<div class="compliment-wrapper" v-if="showCompliment">
						<div class="compliment">
							<div class="compliment__text">
								{{this.complimentWord}}
							</div>
						</div>
					</div>

				</div>


				<div class="bottomMenu">

					<div class="menu__tip menuItem" @click="getTip()" :class="[selectTip ? 'tutorialSelected' : '', isGameForTwo ? 'zeroOpacity' : '']">
						<svg class="svgIcon" width="15" height="23" viewBox="0 0 15 23" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M8.80952 22.0417C8.70168 22.5783 8.16247 23 7.5 23C6.83754 23 6.29832 22.5783 6.19048 22.0417H8.80952Z" /><path d="M9.66096 20.2853L5.24123 20.2725C5.22789 20.2736 5.21455 20.2747 5.18787 20.2769C5.07895 20.2589 4.97789 20.1726 4.96802 20.0518C4.95815 19.931 5.03051 19.8304 5.14838 19.7936C5.16172 19.7925 5.17507 19.7914 5.20175 19.7892L9.60813 19.8031C9.74154 19.7921 9.85703 19.8906 9.868 20.0249C9.87897 20.1591 9.79436 20.2742 9.66096 20.2853Z" /><path d="M5.15316 20.9796C5.16639 20.9785 5.17962 20.9774 5.20607 20.9753L9.57506 20.9922C9.70732 20.9813 9.82191 21.0799 9.83288 21.2142C9.84384 21.3484 9.74681 21.4645 9.61454 21.4755L5.23233 21.4596C5.2191 21.4607 5.20587 21.4618 5.17942 21.464C5.07141 21.4459 4.97115 21.3596 4.96128 21.2388C4.95141 21.118 5.03522 21.0029 5.15316 20.9796Z" /><path d="M5.27194 18.2083H9.72806C10.0099 18.2083 10.2381 18.4227 10.2381 18.6875C10.2381 18.9523 10.0099 19.1667 9.72806 19.1667H5.27194C4.99008 19.1667 4.76191 18.9523 4.76191 18.6875C4.76191 18.4227 4.99008 18.2083 5.27194 18.2083Z" /><path d="M7.4599 0C7.4733 0 7.4733 0 7.48669 0C7.50008 0 7.50008 0 7.51347 0C11.6518 0 15 3.40946 15 7.62354C15 10.5829 13.192 12.8332 11.1295 14.7425C10.3126 15.5062 9.83041 16.5972 9.83041 17.7292H7.52687C7.52687 17.7292 7.51347 17.7292 7.50008 17.7292C7.48669 17.7292 7.47329 17.7292 7.47329 17.7292H5.16975C5.16975 16.5836 4.68761 15.4926 3.87066 14.7425C1.80818 12.8332 0.000160217 10.5966 0.000160217 7.62354C-0.0266256 3.42309 3.32156 0 7.4599 0Z" /></svg>
						<div class="advert" v-if="tipCount === 0 && advTimer <= 0">+2</div>
						<div class="menu__tip_count" v-else>
							<template v-if="advTimer > 0 && tipCount === 0">
								{{advTimerTime}}
							</template>
							<template v-else>
								{{lvl === 0 && !locationGame ? '∞' : tipCount}}
							</template>

						</div>
					</div>


					<div class="action-block__done-word" @dblclick="eraseWord">
						<div class="done-word" :class="[isBadWord ? 'badWord' : '', wordFromLetter.length === 0 ? 'done-word_null' : '']" >{{wordFromLetter}}</div>
					</div>

					<div class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord">
						<svg xmlns="http://www.w3.org/2000/svg" class="sendButtonIcon"
							 width="819.000000pt" height="786.000000pt" viewBox="0 0 819.000000 786.000000">

							<g transform="translate(0.000000,786.000000) scale(0.100000,-0.100000)"
							   fill="#000000" stroke="none">
								<path d="M7870 7854 c-49 -10 -154 -46 -199 -69 -51 -25 -228 -150 -361 -254
-1174 -915 -2920 -2984 -4618 -5475 -41 -59 -75 -106 -77 -104 -1 1 -191 316
-420 698 -434 722 -881 1461 -1018 1685 -90 146 -159 220 -257 278 -57 33 -72
37 -131 37 -260 0 -525 -187 -677 -478 -74 -144 -104 -246 -106 -362 l-1 -95
983 -1750 c871 -1551 989 -1756 1035 -1800 174 -166 478 -207 844 -115 63 16
139 40 171 55 139 64 372 247 479 377 55 66 111 177 685 1358 680 1399 793
1611 1261 2360 168 270 303 469 500 740 592 814 1640 2082 2067 2500 113 111
160 183 160 247 0 60 -39 112 -109 148 -34 17 -160 28 -211 19z"/>
							</g>
						</svg>


					</div>

				</div>


				<div class="action-block">
					<div class="action-block_landscapeDoneWord action-block__done-word" @dblclick="eraseWord">
						<div class="done-word" :class="[isBadWord ? 'badWord' : '', wordFromLetter.length === 0 ? 'done-word_null' : '']" >{{wordFromLetter}}</div>
					</div>
					<div class="action-block__letters">
						<div class="action-block__letter"
							 @click="selectLetter(index, $event)"
							 @touchend="selectLetter(index, $event)"
							 :class="
							  [
							  selectedLetters.includes(index) ? 'action-block__letter_selected' : '',
							  tutorialSelected === index ? 'tutorialSelected' : '',
							  getBreakForPortrait(index) ? 'breakForPortrait' : ''
							  ]"
							 v-for="(letter,index) in letters" :key="letter + Math.random()"
						>
							<div class="action-block__letter action-block__letter_notSelected" v-show="notShowLetters.includes(letter)"></div>
							{{letter}}
						</div>
						<div class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord">
							<svg xmlns="http://www.w3.org/2000/svg" class="sendButtonIcon"
								 width="819.000000pt" height="786.000000pt" viewBox="0 0 819.000000 786.000000">

								<g transform="translate(0.000000,786.000000) scale(0.100000,-0.100000)"
								   fill="#000000" stroke="none">
									<path d="M7870 7854 c-49 -10 -154 -46 -199 -69 -51 -25 -228 -150 -361 -254
-1174 -915 -2920 -2984 -4618 -5475 -41 -59 -75 -106 -77 -104 -1 1 -191 316
-420 698 -434 722 -881 1461 -1018 1685 -90 146 -159 220 -257 278 -57 33 -72
37 -131 37 -260 0 -525 -187 -677 -478 -74 -144 -104 -246 -106 -362 l-1 -95
983 -1750 c871 -1551 989 -1756 1035 -1800 174 -166 478 -207 844 -115 63 16
139 40 171 55 139 64 372 247 479 377 55 66 111 177 685 1358 680 1399 793
1611 1261 2360 168 270 303 469 500 740 592 814 1640 2082 2067 2500 113 111
160 183 160 247 0 60 -39 112 -109 148 -34 17 -160 28 -211 19z"/>
								</g>
							</svg>
						</div>
					</div>
				</div>


				<div class="cloudHint"
					 v-if="cloudHint"
					 :class="[
						 selectMainWord ? 'cloudHint_wordSelected' : '',
						 !cloudHint || showWordDesc ? 'cloudHint_notShowed': '']"
					 @click="closeHint()">
					<p v-if="Array.isArray(cloudsPhrase)">
						<span
							v-for="letterArr in cloudsPhrase"
							:key="letterArr[0] + letterArr[1] + letterArr[2]"
							:class="{
								'cloudHint__letter': true,
								'cloudHint__mainText':  letterArr[2]
							}"
							v-bind:style="letterClasses(letterArr[1])"
						>{{letterArr[0]}}</span>
					</p>
					<p v-else v-html="cloudsPhrase"></p>
				</div>
				<div class="skipTutorial" v-show="cloudHint && !showWordDesc && canShowSkip" @click="skipTutorial">{{notRussian ? 'Skip' : 'Пропустить'}}</div>
				<div v-show="cloudHint && !showWordDesc && canShowSkip" @click="switchSoundsTutorial"
					 class="switchSoundsTutorial menuItem">

					<svg v-if="isSounds" width="24" class="svgIcon" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
						<path d="M17 7.42856C17 7.42856 18.6071 8.34693 18.6071 10.6428C18.6071 12.9388 17 13.8571 17 13.8571" stroke="#731E47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M21 5C21 5 23 6.57143 23 10.5C23 14.4286 21 16 21 16" stroke="#731E47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M1 6.5102V14.7755H5.94505L13.8571 20.2857V1L5.94505 6.5102H1Z" stroke="#731E47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<svg v-else class="svgIcon" width="26" height="22" viewBox="0 0 26 22" fill="#731E47" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 6.5102V14.7755H5.94505L13.8571 20.2857V1L5.94505 6.5102H1Z" stroke="#731E47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<rect x="24" y="6" width="2" height="11.0203" rx="1" transform="rotate(45 24 6)"/>
						<rect x="25.4142" y="13.7925" width="2" height="11.0203" rx="1" transform="rotate(135 25.4142 13.7925)"/>
					</svg>



				</div>



				<div class="bannerForVertical">
					<div class="container-lbInGame" v-if="lbInGame">
						<div class="lbInGame">
							<div
								class="lbInGame__player"
								v-for="player in lbInGame"
								:class="[
									playerRait && getPlayerRank(playerRait) === getPlayerRank(player) ? 'leaderBoardInfo_mine' : ''
								 ]"
								:style="{background: 'url(' + getPlayerAvatar(player) + ') center center no-repeat, whitesmoke'}"
							>
								<div class="lbInGame__score">
									{{ player.score }}
								</div>
							</div>
						</div>
					</div>
					<div class="bannerContainer" v-show="!lbInGame">
						<div id="yandex_rtb_R-A-518275-38"></div>
						<div id="yandex_rtb_R-A-518275-40"></div>
						<div id="yandex_rtb_R-A-518275-41"></div>
					</div>



				</div>

			</div>









			      <div class="rules-blackout" v-show="showAdvTip" @click="closeShowAdvTip()"></div>
			      <div class="rules adv-show" v-show="showAdvTip">
					  <cross-vue @click.native="closeShowAdvTip()"></cross-vue>
			        <h2 class="rules__menu">
			          Предупреждение
			        </h2>
			        Для получения подсказки нужно посмотреть рекламу не менее 3 секунд.
			        <span v-show="isAdvShowed">Но в первый раз вы её получаете.</span>
			      </div>

			<div class="blackout cloudHintBackground" v-if="cloudHint" @click="closeHint()"></div>



			<div class="rules-blackout" v-show="showWordDesc" @click="toggleShowWordDesc"></div>

			<div class="rules word-mean bigRules" v-show="showWordDesc">
				<cross-vue @click.native="toggleShowWordDesc()" ></cross-vue>
				<h2 class="rules__menu">
					{{notRussian ? 'Definition' : 'Определение слова'}}
				</h2>
				<div class="word-definition">
					{{notRussian ? 'Definition - loading...' : 'Определение слова - загрузка...'}}
				</div>
				<iframe src="" id="definitionIframe" sandbox></iframe>

			</div>



			<div class="rules-blackout" v-show="showWhyBadWord" @click="toggleShowWhyBadWord"></div>

			<div class="rules whyBadWord" v-show="showWhyBadWord">
				<cross-vue @click.native="toggleShowWhyBadWord()"></cross-vue>
				<h2 class="rules__menu">
					{{notRussian ? 'Definition' : 'Дорогой игрок!'}}
				</h2>
				<div class="word-definition">
					{{textWhyBadWord}}
				</div>

			</div>

			<div class="rules-blackout" v-show="isInfoAboutTips" @click="toggleIsInfoAboutTips"></div>

			<div class="rules whyBadWord" v-show="isInfoAboutTips">
				<cross-vue @click.native="toggleIsInfoAboutTips()"></cross-vue>
				<h2 class="rules__menu">
					Уведомление
				</h2>
				<div class="word-definition">
					В турнире подсказки отключены, вводить слова можно только вручную
				</div>

			</div>


<!--			<div class="rules-blackout payloadInfoBlackout" v-show="isPayloadInfo"></div>-->
<!--			<div class="rules" v-show="isPayloadInfo">-->
<!--				<h2 class="rules__menu">-->
<!--					Уведомление-->
<!--				</h2>-->
<!--				<div class="payloadInfoText">Поздравляем! Вы получили свою первую звезду!-->
<!--					Так как Вы попали в игру из рекламной акции, у Вас есть выбор: продолжить игру с этого уровня или начать с самого сначала. </div>-->
<!--				<div class="payloadInfoButtons">-->
<!--					<div class="rules__goBg" @click="startOver()">Сначала</div>-->
<!--					<div class="rules__goBg" @click="continueThere()">Продолжить</div>-->
<!--				</div>-->
<!--			</div>-->


			<div class="rules-blackout main-blackout" v-if="openNewBg" @click="toggleOpenNewBg()"></div>
			<div class="rules rules__notification bgRules" v-if="openNewBg">
				<cross-vue @click.native="toggleOpenNewBg()"></cross-vue>
				<h2 class="rules__menu">
					Подарок
				</h2>
				Вам открылся новый фон и цветовое оформление. Перейдите в настройки, чтобы испытать его в игре!

				<div class="rules__goBg" @click="goToChangeBg()">Перейти</div>

			</div>


			<div class="rules-blackout" v-show="showBigWordWas" @click="toggleShowBigWordWas"></div>
			<div class="rules showBigWordWas" v-show="showBigWordWas">
				<cross-vue @click.native="toggleShowBigWordWas()" ></cross-vue>
				<h2 class="rules__menu">
					{{notRussian ? 'Nice try!' : 'Хорошая попытка!'}}
				</h2>
				<p v-if="notRussian">The original word cannot be entered :) Let's try again!</p>
				<p v-else>Исходное слово вводить нельзя :) Давайте попробуем ещё!</p>
			</div>


			<div class="rules-blackout" v-show="showAdvError" @click="toggleShowAdvError"></div>
			<div class="rules" v-show="showAdvError">
				<cross-vue @click.native="toggleShowAdvError()" ></cross-vue>
				<h2 class="rules__menu">
					{{notRussian ? 'Adv error' : 'Ошибка показа'}}
				</h2>
				<p v-if="notRussian">An ad display error has occurred. Most likely you have an ad blocker enabled.
					Turn it off to get free hints.</p>
				<p v-else>Произошла ошибка показа рекламы. Скорее всего, у вас включён блокировщик рекламы.
					Выключите его, чтобы получать бесплатные подсказки.</p>
			</div>

			<div class="blurBackground blurEndGame" v-if="isEndGame" @click="toggleShowLocations"></div>

			<div class="endGame__wrapper" v-if="isEndGame"  :class="isGameForTwo ? 'endGame_gameForTwo' : ''">
				<div class="endGame__header">
					<div class="endGame__icon" :class="endGameIcon" />
					<p class="endGame__goodGame">
						<template v-if="isGameForTwo">
							{{gameForTwoResultText}}
						</template>
						<template v-else>
							{{notRussian ? 'Great!' : goodGameText}}
						</template>
					</p>
					<p v-show="!isGameForTwo">
						{{notRussian ? 'Level' : 'Уровень'}}
							 {{lvl+1}} {{notRussian ? 'completed' : 'пройден'}}!
					</p>
				</div>
				<div class="endGame" >
					<div class="endGame__prize"  :class="isGameForTwo ? 'endGame__players' : ''">
						<template v-if="isGameForTwo">
							<div class="endGame__playerOne">
								<div class="endGame__playerName">
									Игрок #1
									<div class="gameForTwo__icon"></div>
								</div>
								<div class="endGame__player-words">
									<div v-for="word in gameForTwoState.firstPlayer.words">
										{{word}} +{{word.length}}
									</div>
								</div>
								<div class="endGame__player-score">
									Очки: {{gameForTwoState.firstPlayer.words.reduce((acc, c)=>acc+c.length, 0)}}
								</div>
							</div>
							<div class="endGame__playerTwo">
								<div class="endGame__playerName">
									<div class="gameForTwo__icon"></div>
									Игрок #2
								</div>
								<div class="endGame__player-words">
									<div v-for="word in gameForTwoState.secondPlayer.words">
										{{word.length}}+ {{word}}
									</div>
								</div>
								<div class="endGame__player-score">
									Очки: {{gameForTwoState.secondPlayer.words.reduce((acc, c)=>acc+c.length, 0)}}
								</div>

							</div>
						</template>
						<template v-else>
							{{notRussian ? 'Reward' : 'Награда'}}
							<div class="endGame__prizeMoney shop__cart__card">
								<svg class="svgIcon" fill="#66196C" width="63" height="96" viewBox="0 0 63 96" xmlns="http://www.w3.org/2000/svg"><path d="M26 92C26.4529 94.24 28.7176 96 31.5 96C34.2824 96 36.5471 94.24 37 92H26Z" /><path d="M22.424 84.6689L40.9868 84.6156C41.0429 84.6202 41.0989 84.6248 41.211 84.634C41.6684 84.5588 42.0929 84.1988 42.1343 83.6946C42.1758 83.1903 41.8718 82.7704 41.3768 82.6169C41.3208 82.6123 41.2647 82.6077 41.1527 82.5985L22.6458 82.6564C22.0855 82.6103 21.6005 83.0217 21.5544 83.582C21.5083 84.1423 21.8637 84.6228 22.424 84.6689Z" /><path d="M41.3567 87.5672C41.3012 87.5626 41.2456 87.558 41.1345 87.5489L22.7848 87.6197C22.2293 87.574 21.748 87.9857 21.7019 88.546C21.6559 89.1063 22.0634 89.5911 22.6189 89.6368L41.0242 89.5705C41.0798 89.5751 41.1353 89.5797 41.2464 89.5888C41.7001 89.5133 42.1212 89.153 42.1626 88.6488C42.2041 88.1445 41.8521 87.6643 41.3567 87.5672Z" /><path d="M40.8578 76H22.1422C20.9583 76 20 76.8947 20 78C20 79.1053 20.9583 80 22.1422 80H40.8578C42.0417 80 43 79.1053 43 78C43 76.8947 42.0417 76 40.8578 76Z" /><path d="M31.6684 0C31.6122 0 31.6122 0 31.5559 0C31.4997 0 31.4997 0 31.4434 0C14.0623 0 0 14.2308 0 31.82C0 44.1723 7.59367 53.5646 16.2561 61.5338C19.6873 64.7215 21.7123 69.2754 21.7123 74H31.3872C31.3872 74 31.4434 74 31.4997 74C31.5559 74 31.6122 74 31.6122 74H41.2871C41.2871 69.2185 43.312 64.6646 46.7432 61.5338C55.4057 53.5646 62.9993 44.2292 62.9993 31.82C63.1118 14.2877 49.0495 0 31.6684 0Z" /></svg>
								<div class="endGame__moneyCount">
									<svg width="58" height="30" viewBox="0 0 58 30" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path class="endGame__firstPrize" d="M55.4031 5.5088L3.46278 1.73132L9.15527e-05 21.8779L51.2479 29.4328L55.4031 5.5088Z" fill="#386CFE"/>
										<path class="endGame__secondPrize" d="M58 3.77748L6.0597 0L2.59702 20.1465L53.8448 27.7015L58 3.77748Z" fill="#08D2F2"/>
									</svg>


									<div class="endGame__moneyCount__count">
										{{notRussian ? '+1' : '+2'}}
									</div>
								</div>
							</div>
						</template>

					</div>

					<div class="endGame__actions" v-show="!isGameForTwo">
						<div class="endGame__menu" @click="backMenu">
							<svg width="20" class="svgIcon" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.28791 0.502466C9.29186 0.506065 9.2979 0.506065 9.30185 0.502466L9.68671 0.151754C9.90875 -0.0505844 10.2483 -0.0505847 10.4704 0.151753L19.6367 8.50472C20.1064 8.93273 20.1064 9.67189 19.6367 10.0999C19.3737 10.3395 19.0218 10.4262 18.6946 10.3598V19.0003C18.6946 20.1049 17.7992 21.0003 16.6946 21.0003H12.7269V15.4699C12.7269 14.0627 11.5862 12.9219 10.179 12.9219C8.77179 12.9219 7.63103 14.0627 7.63103 15.4699V21.0003H3.31438C2.20981 21.0003 1.31438 20.1049 1.31438 19.0003V10.4834C0.981525 10.5575 0.620611 10.4723 0.352259 10.2278C-0.11742 9.79975 -0.11742 9.06059 0.352259 8.63258L9.12742 0.636008L9.13552 0.625151L9.13746 0.626859L9.27396 0.502466C9.27792 0.498866 9.28396 0.498866 9.28791 0.502466Z" fill="url(#paint0_linear_15_650)"/><defs><linearGradient id="paint0_linear_15_650" x1="9.99448" y1="0" x2="9.99448" y2="21.0003" gradientUnits="userSpaceOnUse"><stop class="endGame__firstStop" stop-color="#1772AF"/><stop class="endGame__secondStop" offset="1" stop-color="#105A8C"/></linearGradient></defs></svg>
						</div>
						<div class="endGame__nextLevel"  @click="nextLevel(true)">{{notRussian ? 'Continue' : 'Продолжить'}}</div>
					</div>
					<div class="endGame__actions"  v-show="isGameForTwo">
						<div class="endGame__nextLevel" @click="backMenu(true, true)">Продолжить</div>
					</div>
				</div>
			</div>



		</div>



		<div class="blurBackground" v-if="shop" @click="toggleShop"></div>


		<div class="popUp shopPopUp" v-if="shop">
			<div class="popUp__header">
				<div class="popUp__title">{{notRussian ? 'Shop' : 'Магазин'}}</div>
				<div class="popUp__close" @click="toggleShop"></div>
			</div>
			<div class="popUp__elements">



					<div class="shop__cart__item" @click="buyTip('cart_item2')">
						<div class="shop__cart__card">
							<div class="shop__cart__item_2">
								<svg class="svgIcon" fill="#66196C" width="63" height="96" viewBox="0 0 63 96" xmlns="http://www.w3.org/2000/svg"><path d="M26 92C26.4529 94.24 28.7176 96 31.5 96C34.2824 96 36.5471 94.24 37 92H26Z" /><path d="M22.424 84.6689L40.9868 84.6156C41.0429 84.6202 41.0989 84.6248 41.211 84.634C41.6684 84.5588 42.0929 84.1988 42.1343 83.6946C42.1758 83.1903 41.8718 82.7704 41.3768 82.6169C41.3208 82.6123 41.2647 82.6077 41.1527 82.5985L22.6458 82.6564C22.0855 82.6103 21.6005 83.0217 21.5544 83.582C21.5083 84.1423 21.8637 84.6228 22.424 84.6689Z" /><path d="M41.3567 87.5672C41.3012 87.5626 41.2456 87.558 41.1345 87.5489L22.7848 87.6197C22.2293 87.574 21.748 87.9857 21.7019 88.546C21.6559 89.1063 22.0634 89.5911 22.6189 89.6368L41.0242 89.5705C41.0798 89.5751 41.1353 89.5797 41.2464 89.5888C41.7001 89.5133 42.1212 89.153 42.1626 88.6488C42.2041 88.1445 41.8521 87.6643 41.3567 87.5672Z" /><path d="M40.8578 76H22.1422C20.9583 76 20 76.8947 20 78C20 79.1053 20.9583 80 22.1422 80H40.8578C42.0417 80 43 79.1053 43 78C43 76.8947 42.0417 76 40.8578 76Z" /><path d="M31.6684 0C31.6122 0 31.6122 0 31.5559 0C31.4997 0 31.4997 0 31.4434 0C14.0623 0 0 14.2308 0 31.82C0 44.1723 7.59367 53.5646 16.2561 61.5338C19.6873 64.7215 21.7123 69.2754 21.7123 74H31.3872C31.3872 74 31.4434 74 31.4997 74C31.5559 74 31.6122 74 31.6122 74H41.2871C41.2871 69.2185 43.312 64.6646 46.7432 61.5338C55.4057 53.5646 62.9993 44.2292 62.9993 31.82C63.1118 14.2877 49.0495 0 31.6684 0Z" /></svg>
							</div>
							<div class="shop__cart__name">
								<p class="shop__tipsCount">10</p>
								{{notRussian ? 'hints' : 'подсказок'}}
							</div>
						</div>
						<div class="shop__cart__buy-button" >
<!--							<div class="shop__lastPrice">20</div>-->
							{{getItemPrice(0)}}
						</div>
					</div>


					<div class="shop__cart__item" @click="buyTip('cart_item3')">
						<div class="shop__cart__card">
							<div class="shop__cart__item_3">
								<svg class="svgIcon" fill="#66196C" width="93" height="96" viewBox="0 0 93 96" xmlns="http://www.w3.org/2000/svg"><path d="M56 92C56.4529 94.24 58.7176 96 61.5 96C64.2823 96 66.5471 94.24 67 92H56Z" /><path d="M52.424 84.6689L70.9868 84.6156C71.0429 84.6202 71.0989 84.6248 71.211 84.634C71.6684 84.5588 72.0929 84.1988 72.1343 83.6946C72.1758 83.1903 71.8718 82.7704 71.3768 82.6169C71.3208 82.6123 71.2647 82.6077 71.1527 82.5985L52.6458 82.6564C52.0855 82.6103 51.6005 83.0217 51.5544 83.582C51.5083 84.1423 51.8637 84.6228 52.424 84.6689Z" /><path d="M71.3567 87.5672C71.3012 87.5626 71.2456 87.558 71.1345 87.5489L52.7848 87.6197C52.2293 87.574 51.748 87.9857 51.7019 88.546C51.6559 89.1063 52.0634 89.5911 52.6189 89.6368L71.0242 89.5705C71.0798 89.5751 71.1353 89.5797 71.2464 89.5888C71.7001 89.5133 72.1212 89.153 72.1626 88.6488C72.2041 88.1445 71.8521 87.6643 71.3567 87.5672Z" /><path d="M70.8578 76H52.1422C50.9583 76 50 76.8947 50 78C50 79.1053 50.9583 80 52.1422 80H70.8578C72.0417 80 73 79.1053 73 78C73 76.8947 72.0417 76 70.8578 76Z" /><path d="M61.6684 0C61.6122 0 61.6122 0 61.5559 0C61.4997 0 61.4997 0 61.4434 0C44.0623 0 30 14.2308 30 31.82C30 44.1723 37.5937 53.5646 46.2561 61.5338C49.6873 64.7215 51.7123 69.2754 51.7123 74H61.3872C61.3872 74 61.4434 74 61.4997 74C61.5559 74 61.6122 74 61.6122 74H71.2871C71.2871 69.2185 73.312 64.6646 76.7432 61.5338C85.4057 53.5646 92.9993 44.2292 92.9993 31.82C93.1118 14.2877 79.0495 0 61.6684 0Z" /><path d="M6.99895 92.1386C7.25955 93.181 8.56255 94 10.1634 94C11.7642 94 13.0672 93.181 13.3278 92.1386H6.99895Z" /><path d="M1.53153 87.2486L18.9484 87.2014C18.9856 87.2035 19.0227 87.2056 19.0971 87.2099C19.3987 87.1526 19.6737 86.9073 19.6929 86.5728C19.712 86.2383 19.5039 85.9653 19.1737 85.8719C19.1365 85.8697 19.0993 85.8676 19.025 85.8633L7.77057 85.7412L1.64529 85.9127C1.27361 85.8914 0.959247 86.1717 0.937973 86.5434C0.9167 86.9151 1.15985 87.2273 1.53153 87.2486Z" /><path d="M18.9445 89.2148C18.9074 89.2127 18.8702 89.2105 18.7959 89.2063L7.54143 89.0842L1.41613 89.2556C1.04446 89.2344 0.730102 89.5147 0.708828 89.8864C0.687555 90.258 0.967873 90.5724 1.33955 90.5937L18.7564 90.5464C18.7936 90.5486 18.8308 90.5507 18.9051 90.555C19.2067 90.4976 19.4818 90.2524 19.5009 89.9178C19.5201 89.5833 19.2769 89.2711 18.9445 89.2148Z" /><path d="M18.9121 81.1561H1.41469C0.632886 81.1561 0 81.789 0 82.5708C0 83.3526 0.632886 83.9855 1.41469 83.9855H18.9121C19.6939 83.9855 20.3268 83.3526 20.3268 82.5708C20.3268 81.789 19.6939 81.1561 18.9121 81.1561Z" /><path d="M19.4705 79.2203V28.1799C19.4705 24.7549 16.6784 22 13.2906 22H7.11067C3.68564 22 0.930727 24.7921 0.930727 28.1799V79.2203H19.4705Z" /></svg>

							</div>
							<div class="shop__cart__name">
								<p class="shop__tipsCount">50</p>
								{{notRussian ? 'hints' : 'подсказок'}}
							</div>
						</div>
						<div class="shop__cart__buy-button">
<!--							<div class="shop__lastPrice">89</div>-->
							{{getItemPrice(1)}}
						</div>
					</div>


					<div class="shop__cart__item" @click="buyTip('cart_item4')">
						<div class="shop__cart__card">
							<div class="shop__cart__item_4">
								<svg class="svgIcon" fill="#66196C" width="128" height="100" viewBox="0 0 128 100" xmlns="http://www.w3.org/2000/svg"><path d="M122.536 84.2581H108.464C107.444 84.2581 106.599 85.1025 106.599 86.1227V88.3743C106.599 89.3946 107.444 90.2389 108.464 90.2389H122.536C123.556 90.2389 124.401 89.3946 124.401 88.3743V86.1227C124.401 85.1025 123.592 84.2581 122.536 84.2581Z" /><path d="M118.842 33.1047C118.49 32.0845 117.963 31.3457 117.47 30.818C116.415 29.7273 114.62 29.7273 113.53 30.818C113.037 31.3457 112.51 32.0845 112.158 33.1047C111.102 36.0951 102.659 50.3435 103.011 60.1942C103.363 70.045 108.464 73.2113 108.464 77.6089C108.464 79.4735 108.464 80.9159 108.464 82.3935H122.536C122.536 80.9511 122.536 79.4735 122.536 77.6089C122.536 73.2113 127.637 70.045 127.989 60.1942C128.341 50.3435 119.898 36.0951 118.842 33.1047Z" /><path d="M112.51 98.0843C112.756 99.0694 113.987 99.8434 115.5 99.8434C117.013 99.8434 118.244 99.0694 118.49 98.0843H112.51Z" /><path d="M109.786 93.4911L121.402 93.4577C121.437 93.4606 121.472 93.4635 121.543 93.4692C121.829 93.4222 122.094 93.1969 122.12 92.8814C122.146 92.5658 121.956 92.3031 121.646 92.207C121.611 92.2041 121.576 92.2012 121.506 92.1954L109.925 92.2317C109.574 92.2029 109.271 92.4603 109.242 92.8109C109.213 93.1616 109.435 93.4622 109.786 93.4911Z" /><path d="M121.39 95.3276C121.355 95.3247 121.32 95.3218 121.25 95.316L109.668 95.3523C109.318 95.3234 109.014 95.5809 108.985 95.9315C108.956 96.2821 109.214 96.5857 109.564 96.6145L121.181 96.5812C121.216 96.5841 121.251 96.5869 121.321 96.5927C121.607 96.5456 121.873 96.3204 121.899 96.0048C121.925 95.6892 121.665 95.4207 121.39 95.3276Z" /><path d="M57 92C57.4529 94.24 59.7176 96 62.5 96C65.2823 96 67.5471 94.24 68 92H57Z" /><path d="M53.424 84.6689L71.9868 84.6156C72.0429 84.6202 72.0989 84.6248 72.211 84.634C72.6684 84.5588 73.0929 84.1988 73.1343 83.6946C73.1758 83.1903 72.8718 82.7704 72.3768 82.6169C72.3208 82.6123 72.2647 82.6077 72.1527 82.5985L53.6458 82.6564C53.0855 82.6103 52.6005 83.0217 52.5544 83.582C52.5083 84.1423 52.8637 84.6228 53.424 84.6689Z" /><path d="M72.3567 87.5672C72.3012 87.5626 72.2456 87.558 72.1345 87.5489L53.7848 87.6197C53.2293 87.574 52.748 87.9857 52.7019 88.546C52.6559 89.1063 53.0634 89.5911 53.6189 89.6368L72.0242 89.5705C72.0798 89.5751 72.1353 89.5797 72.2464 89.5888C72.7001 89.5133 73.1212 89.153 73.1626 88.6488C73.2041 88.1445 72.8521 87.6643 72.3567 87.5672Z" /><path d="M71.8578 76H53.1422C51.9583 76 51 76.8947 51 78C51 79.1053 51.9583 80 53.1422 80H71.8578C73.0417 80 74 79.1053 74 78C74 76.8947 73.0417 76 71.8578 76Z" /><path d="M62.6684 0C62.6122 0 62.6122 0 62.5559 0C62.4997 0 62.4997 0 62.4434 0C45.0623 0 31 14.2308 31 31.82C31 44.1723 38.5937 53.5646 47.2561 61.5338C50.6873 64.7215 52.7123 69.2754 52.7123 74H62.3872C62.3872 74 62.4434 74 62.4997 74C62.5559 74 62.6122 74 62.6122 74H72.2871C72.2871 69.2185 74.312 64.6646 77.7432 61.5338C86.4057 53.5646 93.9993 44.2292 93.9993 31.82C94.1118 14.2877 80.0495 0 62.6684 0Z" /><path d="M6.99895 95.1386C7.25955 96.181 8.56255 97 10.1634 97C11.7642 97 13.0672 96.181 13.3278 95.1386H6.99895Z" /><path d="M1.53365 90.2299L18.9506 90.2202C18.9878 90.2224 19.0249 90.2246 19.0992 90.229C19.401 90.1723 19.6766 89.9277 19.6964 89.5932C19.7163 89.2587 19.5088 88.9854 19.1787 88.8912C19.1415 88.8889 19.1044 88.8867 19.0301 88.8823L7.77591 88.736L1.65028 88.8943C1.27865 88.8722 0.963683 89.1519 0.94161 89.5235C0.919537 89.8951 1.16202 90.2079 1.53365 90.2299Z" /><path d="M18.9424 92.2336C18.9052 92.2314 18.868 92.2292 18.7937 92.2248L7.53958 92.0784L1.41394 92.2367C1.04231 92.2147 0.72735 92.4943 0.705277 92.8659C0.683204 93.2376 0.962846 93.5525 1.33448 93.5746L18.7514 93.5648C18.7886 93.567 18.8258 93.5692 18.9001 93.5737C19.2018 93.517 19.4774 93.2723 19.4973 92.9378C19.5171 92.6034 19.2746 92.2906 18.9424 92.2336Z" /><path d="M18.9121 84.1561H1.41469C0.632886 84.1561 0 84.789 0 85.5708C0 86.3526 0.632886 86.9855 1.41469 86.9855H18.9121C19.6939 86.9855 20.3268 86.3526 20.3268 85.5708C20.3268 84.789 19.6939 84.1561 18.9121 84.1561Z" /><path d="M19.4705 82.2203V31.1799C19.4705 27.7549 16.6784 25 13.2906 25H7.11067C3.68564 25 0.930727 27.7921 0.930727 31.1799V82.2203H19.4705Z" /></svg>

							</div>
							<div class="shop__cart__name">
								<p class="shop__tipsCount">100</p>
								{{notRussian ? 'hints' : 'подсказок'}}
							</div>
						</div>
						<div class="shop__cart__buy-button">
<!--							<div class="shop__lastPrice">149</div>-->
							{{getItemPrice(2)}}
						</div>
					</div>

				<div class="shop__cart__item" @click="buyTip('cart_item5')">
					<div class="shop__cart__card">
						<div class="shop__cart__item_5">
							<svg class="svgIcon" width="96" height="68" viewBox="0 0 96 68" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M46.3333 61.3333C46.6353 62.8267 48.1451 64 50 64C51.8549 64 53.3647 62.8267 53.6667 61.3333H46.3333Z" /><path d="M43.9493 56.4459L56.3246 56.4104C56.3619 56.4135 56.3993 56.4165 56.474 56.4227C56.7789 56.3725 57.0619 56.1326 57.0896 55.7964C57.1172 55.4602 56.9146 55.1803 56.5845 55.078C56.5472 55.0749 56.5098 55.0718 56.4351 55.0657L44.0972 55.1043C43.7237 55.0736 43.4003 55.3478 43.3696 55.7214C43.3389 56.0949 43.5758 56.4152 43.9493 56.4459Z" /><path d="M56.5711 58.3781C56.5341 58.3751 56.4971 58.372 56.423 58.3659L44.1898 58.4131C43.8195 58.3827 43.4987 58.6572 43.468 59.0307C43.4372 59.4042 43.7089 59.7274 44.0793 59.7579L56.3495 59.7137C56.3865 59.7167 56.4236 59.7198 56.4976 59.7259C56.8 59.6755 57.0808 59.4354 57.1084 59.0992C57.1361 58.763 56.9014 58.4429 56.5711 58.3781Z" /><path d="M56.2386 50.6667H43.7614C42.9722 50.6667 42.3333 51.2632 42.3333 52C42.3333 52.7369 42.9722 53.3333 43.7614 53.3333H56.2386C57.0278 53.3333 57.6667 52.7369 57.6667 52C57.6667 51.2632 57.0278 50.6667 56.2386 50.6667Z" /><path d="M50.1123 0C50.0748 0 50.0748 0 50.0373 0C49.9998 0 49.9998 0 49.9623 0C38.3749 0 29 9.48718 29 21.2133C29 29.4482 34.0624 35.7097 39.8374 41.0226C42.1249 43.1477 43.4748 46.1836 43.4748 49.3333H49.9248C49.9248 49.3333 49.9623 49.3333 49.9998 49.3333C50.0373 49.3333 50.0748 49.3333 50.0748 49.3333H56.5247C56.5247 46.1456 57.8747 43.1097 60.1622 41.0226C65.9371 35.7097 70.9995 29.4862 70.9995 21.2133C71.0745 9.52513 61.6996 0 50.1123 0Z" /><path d="M21.4432 67.121C21.5714 67.6132 22.2124 68 23 68C23.7875 68 24.4286 67.6132 24.5568 67.121H21.4432Z" /><path d="M18.7545 64.803L27.323 64.7984C27.3413 64.7995 27.3595 64.8005 27.3961 64.8026C27.5445 64.7758 27.6801 64.6603 27.6899 64.5023C27.6997 64.3444 27.5976 64.2153 27.4352 64.1708C27.4169 64.1698 27.3986 64.1687 27.3621 64.1667L21.8255 64.0976L18.8119 64.1723C18.629 64.1619 18.4741 64.2939 18.4632 64.4694C18.4524 64.6449 18.5717 64.7926 18.7545 64.803Z" /><path d="M27.3189 65.7492C27.3006 65.7482 27.2824 65.7471 27.2458 65.745L21.7092 65.6759L18.6956 65.7507C18.5128 65.7403 18.3578 65.8723 18.347 66.0478C18.3361 66.2233 18.4737 66.372 18.6565 66.3825L27.225 66.3778C27.2433 66.3789 27.2616 66.3799 27.2981 66.382C27.4466 66.3552 27.5821 66.2397 27.5919 66.0818C27.6017 65.9238 27.4824 65.7761 27.3189 65.7492Z" /><path d="M27.304 61.9348H18.696C18.3114 61.9348 18 62.2337 18 62.6029C18 62.9721 18.3114 63.2709 18.696 63.2709H27.304C27.6886 63.2709 28 62.9721 28 62.6029C28 62.2337 27.6886 61.9348 27.304 61.9348Z" /><path d="M27.5788 61.0207V36.9183C27.5788 35.3009 26.2051 34 24.5385 34H21.4982C19.8132 34 18.4579 35.3185 18.4579 36.9183V61.0207H27.5788Z" /><path d="M8.59594 60.413H2.40405C1.95514 60.413 1.58363 60.8241 1.58363 61.3207V62.4168C1.58363 62.9135 1.95514 63.3245 2.40405 63.3245H8.59594C9.04485 63.3245 9.41637 62.9135 9.41637 62.4168V61.3207C9.41637 60.8241 9.06033 60.413 8.59594 60.413Z" /><path d="M6.97057 35.5114C6.81578 35.0147 6.58358 34.6551 6.36686 34.3982C5.90247 33.8673 5.113 33.8673 4.63313 34.3982C4.41641 34.6551 4.18422 35.0147 4.02943 35.5114C3.56503 36.9671 -0.150095 43.9033 0.00470252 48.6987C0.1595 53.494 2.40406 55.0354 2.40406 57.1762C2.40406 58.0839 2.40406 58.7861 2.40406 59.5054H8.59594C8.59594 58.8032 8.59594 58.0839 8.59594 57.1762C8.59594 55.0354 10.8405 53.494 10.9953 48.6987C11.1501 43.9033 7.43497 36.9671 6.97057 35.5114Z" /><path d="M4.18423 67.1437C4.29259 67.6232 4.83438 68 5.50001 68C6.16564 68 6.70743 67.6232 6.81579 67.1437H4.18423Z" /><path d="M2.98582 64.9077L8.09704 64.8914C8.11247 64.8928 8.12789 64.8942 8.15875 64.897C8.2847 64.8741 8.40157 64.7645 8.41299 64.6109C8.42441 64.4572 8.34072 64.3293 8.20441 64.2826C8.18898 64.2812 8.17356 64.2798 8.14271 64.277L3.04692 64.2946C2.89264 64.2806 2.75906 64.4059 2.74638 64.5766C2.73369 64.7473 2.83154 64.8936 2.98582 64.9077Z" /><path d="M8.09152 65.8017C8.07609 65.8003 8.06067 65.7989 8.02981 65.7961L2.93403 65.8137C2.77975 65.7997 2.64617 65.925 2.63349 66.0957C2.62081 66.2664 2.73409 66.4141 2.88836 66.4282L7.99958 66.4119C8.01501 66.4133 8.03043 66.4147 8.06129 66.4176C8.18725 66.3946 8.30412 66.285 8.31553 66.1314C8.32695 65.9777 8.21241 65.847 8.09152 65.8017Z" /><path d="M74.001 33.8466C74.001 33.8466 73.8382 30.9793 77.7445 29.4614C81.6508 27.9435 86.2082 27.2688 91.4166 29.1241C96.1618 30.8144 96.0434 32.7846 95.9848 33.7594L95.9846 33.7642L95.9844 33.7671C95.9813 33.8183 95.9784 33.8667 95.9764 33.9121C95.9749 33.9484 95.9739 33.9828 95.9739 34.0152V41.7736C95.8655 43.0667 95.03 46.0576 92.5559 47.6767C91.0704 48.649 91.1248 50.0882 91.1854 51.6954C91.251 53.4339 91.3244 55.2002 89.4637 56.953C89.4637 56.953 82 56.953 80.5115 56.953C79.8604 56.6157 78.5583 55.6038 78.7211 52.0619C78.8027 50.2855 77.6152 48.7213 76.4111 47.1351C75.2142 45.5587 74.001 43.9605 74.001 42.1109V33.8466Z" /><path d="M89.4637 57.567H81V58.5789C81 58.9515 81.2915 59.2536 81.6511 59.2536H88.8126C89.1722 59.2536 89.4637 58.9515 89.4637 58.5789V57.567Z" /><path d="M81.3255 60.2655C81.3255 59.8929 81.617 59.5909 81.9766 59.5909H88.4871C88.8466 59.5909 89.1381 59.8929 89.1381 60.2655C89.1381 60.6381 88.8466 60.9402 88.4871 60.9402H81.9766C81.617 60.9402 81.3255 60.6381 81.3255 60.2655Z" /><path d="M81.9766 61.2775C81.617 61.2775 81.3255 61.5795 81.3255 61.9521C81.3255 62.3247 81.617 62.6268 81.9766 62.6268H88.4871C88.8466 62.6268 89.1381 62.3247 89.1381 61.9521C89.1381 61.5795 88.8466 61.2775 88.4871 61.2775H81.9766Z" /><path d="M81.3255 63.6388C81.3255 63.2662 81.617 62.9641 81.9766 62.9641H88.4871C88.8466 62.9641 89.1381 63.2662 89.1381 63.6388C89.1381 64.0114 88.8466 64.3134 88.4871 64.3134H81.9766C81.617 64.3134 81.3255 64.0114 81.3255 63.6388Z" /><path d="M87.185 64.6507H82.9532C82.9532 65.3959 83.5361 66 84.2553 66H85.8829C86.602 66 87.185 65.3959 87.185 64.6507Z" /></svg>
						</div>
						<div class="shop__cart__name">
							<p class="shop__tipsCount">250</p>
							{{notRussian ? 'hints' : 'подсказок'}}
						</div>
					</div>
					<div class="shop__cart__buy-button" >
<!--							<div class="shop__lastPrice">299</div>-->
							{{getItemPrice(3)}}
					</div>
				</div>
				<div class="shop__cart__item shop__cart__last"
					 @click="buyTip('cart_item6')"
					 v-show="(!notShowAds && platformBuild === 'yandex') || platformBuild === 'gp'"
				>
					<div class="shop__cart__card">
						<div class="shop__cart__item_5">
							<div class="noAdvert">
								<svg class="noAdvert__advert" width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.133268 7.31339C0.0458686 7.33307 -0.0127351 7.42047 0.00237327 7.50861L1.042 13.5734C1.0571 13.6616 1.1402 13.7171 1.2276 13.6974L2.59532 13.3894V33.8381C2.59532 33.9275 2.66795 34 2.75755 34H35.8378C35.9274 34 36 33.9275 36 33.8381V11.1405C36 11.0511 35.9274 10.9786 35.8378 10.9786H13.302L33.6892 6.38798C33.7766 6.3683 33.8352 6.2809 33.8201 6.19276L32.7805 0.127919C32.7653 0.0397812 32.6822 -0.0157149 32.5948 0.00396503L0.133268 7.31339ZM15.144 26.46L24.6242 22.6755L15.144 18.891V26.46Z" fill="url(#paint0_linear_48_3354)"/><defs><linearGradient id="paint0_linear_48_3354" x1="36" y1="-3" x2="3" y2="34" gradientUnits="userSpaceOnUse"><stop/><stop offset="0.994865" stop-color="#5E5E5E"/></linearGradient></defs></svg>
								<svg class="svgIcon noAdvert__advertCircle" width="72" height="72" viewBox="0 0 72 72" fill="#D21AE5" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM13.7017 56.2846C8.8274 50.9295 5.85592 43.8118 5.85592 36C5.85592 19.3519 19.3519 5.85592 36 5.85592C42.6732 5.85592 48.8399 8.02433 53.834 11.695L13.7017 56.2846ZM17.3613 59.6926C22.4905 63.7333 28.9637 66.1441 36 66.1441C52.6481 66.1441 66.1441 52.6481 66.1441 36C66.1441 27.8245 62.8895 20.4092 57.6052 14.979L17.3613 59.6926Z"/></svg>
							</div>


						</div>
						<div class="shop__cart__name shop__name_advert">
							<p
								class="shop__tipsCount shop__tipsCount_advert"
							   v-if="platformBuild === 'gp'"
							>
								Подписка: отключение рекламы
							</p>
							<p class="shop__tipsCount shop__tipsCount_advert" v-else>
								{{notRussian ? 'No adverts' : 'Отключение рекламы'}}
							</p>
<!--							+ отключение рекламы-->

						</div>
					</div>
					<div class="shop__cart__buy-button" >
<!--						<div class="shop__lastPrice">499</div>-->
						<template v-if="platformBuild === 'gp'">
							{{platformBuild === 'gp' && notShowAds ? 'Отменить' : getItemPrice(4)}}
						</template>
						<template v-else>
							{{getItemPrice(4)}}
						</template>


					</div>
				</div>

				<div class="empty__item"></div>



			</div>


		</div>

		<div class="rules-blackout main-blackout" v-if="purchaseCompleted" @click="togglePurchaseCompleted()"></div>

		<div class="rules rules__notification" v-if="purchaseCompleted">
			<cross-vue @click.native="togglePurchaseCompleted()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Successful purchase' : 'Покупка совершена'}}
			</h2>
			{{notRussian ? 'Thank you for your purchase! Have a good game!' : 'Вы успешно совершили оплату, покупка уже зачислена на ваш аккаунт! Большое спасибо и удачной Вам игры!'}}
		</div>

		<div class="rules-blackout main-blackout" v-if="subscribeCompleted" @click="toggleSubscribeCompleted()"></div>

		<div class="rules rules__notification" v-if="subscribeCompleted">
			<cross-vue @click.native="toggleSubscribeCompleted()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Subscription completed!' : 'Подписка оформлена!'}}
			</h2>
			{{notRussian ? 'You have successfully subscribed! Advertising is disabled in the game. Thanks!'
			: 'Вы успешно оформили подписку! Реклама в игре отключена. Спасибо и удачной игры!'}}
		</div>



		<div
			class="blackout rules-blackout"
			@click="toggleSettings"
			v-show="isSettings"

		></div>

		<div class="settings" v-show="isSettings">
			<div class="settings__header">{{notRussian ? 'Settings' : 'Настройки'}}</div>
			<ul>
				<li>
					<div class="changeDesign">
						<div class="changeLeft" @click="changeBgLeft"></div>

						<div class="chosenBg" :class="'chosenBg' + chosenBg">
							<div class="closedBg" v-if="cantShowBg">Фон откроется на {{bgLvlsOpen[chosenBg-1]+1}} уровне</div>
						</div>

						<div class="changeRight" @click="changeBgRight"></div>
					</div>
				</li>
				<li>
					<input type="checkbox"
						   @change="switchSounds"
						   v-model="isSounds"
						   id="musicCheckbox"
						   class="checkbox"

					/>
					<label
						for="musicCheckbox">
						{{notRussian ? 'Sounds' : 'Звуки'}}
					</label>
				</li>
				<li>
					<input type="checkbox"
						   @change="switchMusic"
						   v-model="isMusic"
						   id="music2Checkbox"
						   class="checkbox"

					/>
					<label
						for="music2Checkbox">
						{{notRussian ? 'Music' : 'Музыка'}}
					</label>
				</li>
				<li>
					<input type="checkbox"
						   @change="toggleLastSounds"
						   v-model="lastSounds"
						   id="lastSoundCheckbox"
						   class="checkbox"

					/>
					<label
						for="lastSoundCheckbox">
						{{notRussian ? 'Old sounds' : 'Старые звуки'}}
					</label>
				</li>


				<li>
          <span
			  class="settings__text"
			  @click="toggleRules"
		  >
            {{notRussian ? 'Rules' : 'Как играть?'}}

          </span>
				</li>


				<template v-if="!notRussian">
					<li>
						<a :href="linkToGroup"
						   target="_blank"
						   rel="noopener noreferrer"
						   class="settings__text"
						   @click="()=>{sendParams({'vk': 1})}"
						>
							Наша группа
						</a>
					</li>

					<li class='our-games'>
						Наши игры
					</li>

					<li v-for="obj in allGamesInfo" @click="()=>{sendParams({'crs': 1})}">
						<a :href="obj.url"
						   target="_blank"
						   rel="noopener noreferrer"
						>
							<div
								class="my-game"
								:style="{
                                       background: 'url('+obj.coverURL+') center center no-repeat',
									   backgroundSize: '100%'
									}"
							>
							</div>
						</a>
					</li>
				</template>


			</ul>
		</div>

		<div class="rules-blackout main-blackout" v-if="showLastLevelInfo" @click="toggleShowLastLevelInfo()"></div>
		<div class="rules rules__notification" v-if="showLastLevelInfo">
			<cross-vue @click.native="toggleShowLastLevelInfo()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Update' : locationGame ? 'Ура!' : wasUpdate ? 'Обновление' : 'Дорогой игрок!'}}
			</h2>
			<template v-if="locationGame">
				Поздравляем! Вы заработали {{howManyTips*2}} звёзд в локации "{{getLocationName(gameLocation)}}"!
				За это мы дарим вам дополнительные {{howManyTips}} подсказок. Удачной игры!
			</template>
			<template v-else-if="wasUpdate">
				<div class="updateText">
					<template v-if="platformBuild === 'gp'">
						Уважаемые игроки! Теперь вы можете отключить рекламные объявления в разделе покупок. Спасибо за то, что играете в нашу игру!
					</template>
					<template v-else>
						<template v-if="notRussian">
							Dear players! We wish you a pleasant game :)
						</template>

						<template v-else>
							Дорогие игроки! Желаем вам приятной игры :)
						</template>
					</template>

				</div>


				<div class="rules__goBg" v-if="platformBuild === 'gp'" @click="goToShop()">Перейти</div>
<!--				<div class="rules__goBg" @click="goToGetLocations()">Перейти</div>-->

<!--				<div class="questionInput">-->
<!--					<input type="radio" id="one" value="Знаю и меняю" v-model="selectedOption" />-->
<!--					<label for="one">Да, знаю и меняю</label>-->
<!--				</div>-->
<!--				<div class="questionInput">-->
<!--					<input type="radio" id="two" value="Знаю, но не меняю" v-model="selectedOption" />-->
<!--					<label for="two">Знаю, но не меняю</label>-->
<!--				</div>-->
<!--				<div class="questionInput">-->
<!--					<input type="radio" id="three" value="Не знаю" v-model="selectedOption" />-->
<!--					<label for="three">Не знаю</label>-->
<!--				</div>-->


<!--				<div class="rules__goBg" @click="sendSelectedData">Отправить</div>-->
			</template>
			<template v-else>
				<template v-if="notRussian"> Congratulations! You have passed all the levels of the game! But do not despair, new ones will definitely appear soon. We add new levels every month.</template>
				<template v-else>
					Поздравляем! Вы прошли все уровни игры! Но не отчаивайтесь, скоро обязательно появятся новые. Мы добавляем новые уровни каждый месяц.
					Вы можете пройти все старые уровни на 3 звезды (если ещё не прошли) или же подождать, когда выйдут новые уровни. Про обновления вы можете узнать в
					<a :href="linkToGroup"
					   target="_blank"
					   rel="noopener noreferrer"
					   class="settings__text"
					   @click="()=>{sendParams({'vk-lastLevel': 1})}"
					>
						группе ВКонтакте
					</a>.
				</template>
			</template>

		</div>



		<div class="rules-blackout main-blackout" v-show="rules" @click="toggleRules()"></div>
		<div class="rules" v-show="rules">
			<cross-vue @click.native="toggleRules()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Rules' : eventLocation ? 'Новогодний турнир' : 'Правила'}}
			</h2>

			<template v-if="eventLocation">
				<div class="eventLocationText">
					Участвуйте в новогоднем турнире «Слова из слова»!
					<ul>
						<li>Авторизуйтесь и ищите слова на специальных уровнях 🎁</li>
						<li>Выигрывайте промокоды Яндекс Маркета 🏆</li>
						<li>Играйте из <a href="https://www.viber.com/yandexgamesbot" class="viberClass" target="_blank">Viber</a> и участвуйте в дополнительном розыгрыше Яндекс Станции Лайт! 🔥</li>
						<li>Турнир продлится с 12:00 «30» декабря 2022 года до 12:00 «08» января 2023 года.⏰</li>
					</ul>

					<div
						class="rules__goBg"
						v-show="!isPlayerAuth"
						@click="getAuth()"
					>
						Авторизоваться
					</div>

<!--					<span @click="toggleIsEventResult" class="prizesText">500 призов</span>, главный из которых - умная колонка «Яндекс Станция Мини» 🏆<br>-->
<!--					Для участия в турнире необходимо:-->
<!--					<ul>-->
<!--						<li>-->
<!--							Авторизоваться на платформе Яндекс.Игры 🎮-->
<!--						</li>-->
<!--						<li>-->
<!--							Проходить специальные уровни Чёрной Пятницы до 12:00 26 ноября 2022 ⚡-->
<!--						</li>-->
<!--						<li>-->
<!--							Получать очки за отгаданные слова (слово из 2 букв приносит 2 очка, из 5 букв - 5 очков) 🎁-->
<!--						</li>-->
<!--					</ul>-->
					<p class="fullRules"><a href="https://disk.yandex.ru/i/QJoTb42vosgemA" target="_blank">Полные условия</a></p>
				</div>

			</template>
			<template v-else>
				<div class="rules__text">
					<p>
						{{notRussian ?
						'Welcome to the game "Words from Words"! You are given the word. Create as many different words as possible from its letters. You can create only common nouns.' :
						'Добро пожаловать в игру "Слова из слова"! Цель игры - составлять всевозможные слова из выданных вам слов. Создавать можно только нарицательные существительные в единственном числе. Нажмите на букву внизу, чтобы добавить или убрать эту букву из слова. Когда слово будет набрано, нажмите на галочку.'
						}}

					</p>
					<img draggable="false" v-bind:src="!notRussian ? 'rules1.png' : 'rules1EN.png'" alt="Пример слова">
					<p>
						{{notRussian ?
						'Use hints to add words that you can\'t find. Hints can be obtained by earning stars. Level progress is 33% - 1 star, 66% - 2 stars, 100% -3 stars. Get at least 1 star and click on the arrow in the upper right corner to go to the next level.' :
						'Если у вас закончились идеи, используйте подсказку (она нарисована как лампочка). Подсказки можно получить за звёзды. Уровень пройден на 33% - 1 звезда, 66% - 2 звезды, 100% - 3 звезды. Чтобы перейти на следующий уровень, получите хотя бы 1 звезду и нажмите на стрелку в правом верхнем углу.'
						}}

					</p>
					<img draggable="false" v-bind:src="!notRussian ? 'rules2.png' : 'rules2EN.png'" alt="Подсказка">
					<p v-if="!notRussian">
						Примечание: буква "е" и "ё" взаимозаменяемы по техническим причинам.
					</p>
					{{notRussian ?
					'Click on a word to get its definition.' :
					'Нажатие на слово позволит вам узнать его значение. Словарь игры постоянно пополняется. Если вы обнаружили лишнее или недостающее слово, пожалуйста, сообщите нам в'
					}}
					<a :href="linkToGroup"  v-if="!notRussian" target="_blank" rel="noopener noreferrer" class="settings__text" @click="()=>{sendParams({'vk-fromRules': 1})}"
					>
						группу ВКонтакте.
					</a>
					{{notRussian ? 'We also inform you that the game is still under development. Have a good game!' : 'Удачной игры!'}}

				</div>
			</template>

		</div>


		<div class="rules-blackout" v-if="isEventResult" @click="toggleIsEventResult"></div>

		<div class="rules eventRules" v-if="isEventResult">
			<cross-vue @click.native="toggleIsEventResult()" ></cross-vue>
			<h2 class="rules__menu">
				{{notShowResult ? 'Призы' : 'Ура!'}}
			</h2>
			<div class="levelClosedText">
				<template v-if="notShowResult">
					Список призов:
					<ul>
						<li>1-300 места - промокод в Яндекс Маркет на 200 ₽</li>
						<li>Играйте из <a href="https://www.viber.com/yandexgamesbot" class="viberClass" target="_blank">Viber</a> и участвуйте в дополнительном розыгрыше Яндекс Станции Лайт! 🔥</li>
					</ul>

					Результаты Новогоднего Турнира будут опубликованы 10 января после 12:00 по МСК!
					<p class="fullRules"><a href="https://disk.yandex.ru/i/QJoTb42vosgemA" target="_blank">Полные условия</a></p>
				</template>
				<template v-else-if="isResultLoading">
					Идёт загрузка результатов...
				</template>
				<template v-if="!notShowResult && !isResultLoading">

					<template v-if="eventResult >= 1 && eventResult <= 3">
						<h2>Поздравляем!</h2>
						<p>Вы выиграли промокод на <a href="https://plus.yandex.ru/" target="_blank" class="plusLink">Яндекс Плюс</a> на 60 дней!</p>
<!--						<p>Вы заняли <span class="prizeText">{{playerInfo.rank}} место</span> в Новогоднем турнире!</p>-->
<!--						<div>Ваш приз: 🏆 {{getPrize()}} 🏆</div>-->
					</template>
<!--					<template v-if="eventResult === 4">-->
<!--						<h2>Спасибо за участие!</h2>-->
<!--						<p>Вы заняли <span class="prizeText">{{playerInfo.rank}} место</span> в Новогоднем турнире</p>-->
<!--						<div class="eventDivWithMargins">К сожалению, вы не заняли одно из призовых мест.</div>-->
<!--						<div class="eventDivWithMargins">Но без подарков не останетесь, ведь 25 дополнительных подсказок уже на вашем счету!</div>-->
<!--					</template>-->

<!--					<template v-if="eventResult === 1">-->
<!--						<div class="eventReceive">Для его получения вам необходимо</div>-->
<!--						<ul>-->
<!--							<li>Сделать скриншот этого сообщения</li>-->
<!--							<li class="mailPrize">-->
<!--								Отправить скриншот на почту-->
<!--								<a class="prizesText" href="mailto:yndx-games-prizes@yandex.ru">yndx-games-prizes@yandex.ru</a>-->
<!--							</li>-->
<!--						</ul>-->
<!--						А дополнительные 100 подсказок уже на вашем счету!-->
<!--					</template>-->
					<template v-if="eventResult === 1 || eventResult === 2">
						<div class="eventReceive promoCode">Ваш промокод: {{getPromoCode()}}</div>
<!--						<span v-if="eventResult === 1">А дополнительные 20 подсказок уже на вашем счету!</span>-->
					</template>
<!--					<template v-if="eventResult === 3">-->
<!--						<div class="eventDivWithMargins">Яны автоматически зачислятся на ваш баланс Яндекс.Игр через некоторое время.</div>-->
<!--						<div class="eventDivWithMargins">А дополнительные 50 подсказок уже на вашем счету!</div>-->
<!--					</template>-->
					<template v-if="eventResult === 1 || eventResult === 2">
						<div class="rules__goBg button__promoCode" @click="copyPromoCode()">{{buttonPromoText}}</div>
<!--						<a-->
<!--							href="https://market.yandex.ru/?utm_source=partner_network&utm_medium=link&utm_campaign=2728755&clid=2728755&pp=900&mclid=1003&distr_type=7"-->
<!--							target="_blank"-->
<!--						>-->
<!--						<div class="rules__goBg">В магазин</div>-->
<!--						</a>-->
					</template>


					<template v-if="eventResult === 1 || eventResult === 3">
						<p class="uniqueID">{{playerInfo.player.uniqueID}}</p>
<!--						<span :class="eventResult === 3 ? 'linkStation' : ''">-->
<!--							Для получения приза "Яндекс Станция Лайт" напишите на почту:-->
<!--						<a href="mailto:yndx-games-prizes@yandex.ru">yndx-games-prizes@yandex.ru</a> и приложите к письму скриншот поздравления из игры-->
<!--						</span>-->
						<span>Для активации перейдите на сайт <a href="https://plus.yandex.ru/" target="_blank" class="plusLink">https://plus.yandex.ru/</a>
							и активируйте промокод
						</span>

					</template>




					<template v-if="eventResult === 1 || eventResult === 2">
						<div class="smallText">
							Условия подписки: <a href="ya.cc/plus_conditions" target="_blank" class="plusLink">ya.cc/plus_conditions</a>. 60 дней подписки Яндекс Плюс бесплатно, далее автопродление — 299 руб./мес. Активировать до 30.09.2023. Требуется указание данных банковской карты. Предложение только для пользователей, не имеющих активную Подписку Яндекс Плюс (или иную, ее включающую).
						</div>
						<div class="smallText">
							1 пользователь может активировать промокод только 1 раз. С использованием одной платежной карты (вне зависимости от числа пользователей, ее использующих) можно активировать не более 3 промокодов на бесплатную подписку совокупно по всем акциям. В случае наличия в действиях пользователя на сервисах ООО «ЯНДЕКС» и его аффилированных лиц признаков злоупотребления правами и возможностями активация промокода может быть недоступна.
						</div>
					</template>



					<template v-if="eventResult === 0">
						К сожалению, вы не участвовали в турнире или не были авторизованы
					</template>

				</template>

			</div>


		</div>

		<div class="rules-blackout" v-if="isInfoAboutClosedEvent" @click="toggleInfoAboutClosedEvent"></div>

		<div class="rules" v-if="isInfoAboutClosedEvent">
			<cross-vue @click.native="toggleInfoAboutClosedEvent()" ></cross-vue>
			<h2 class="rules__menu">
				Турнир завершён
			</h2>
			<div class="levelClosedText">
				Начисление очков в Новогоднем турнире завершено. Теперь вы можете играть только без зачёта очков в рейтинг.
				Результаты вы сможете увидеть 26 ноября после 15:00 по МСК! Спасибо за участие!
			</div>

		</div>

		<div class="rules-blackout" v-if="crosspromo" @click="toggleCrossPromo"></div>

		<div class="rules crossPromoRules" v-if="crosspromo">
			<cross-vue @click.native="toggleCrossPromo()" ></cross-vue>
			<h2 class="rules__menu">
				Новая игра!
			</h2>
			<p class="crossPromoText">
				Открывайте буквы и расшифровывайте фразы в нашей новой игре -
				<span class="crossPromoText_bold">Криптограмма</span>
			</p>
			<a :href="crossPromoObj.url"
			   target="_blank"
			   rel="noopener noreferrer"
			   class="crossPromoWrapper"
			>
				<div
					class="my-game crossPromoImg"
					:style="{
                                       background: 'url('+crossPromoObj.coverURL+') center center no-repeat',
									   backgroundSize: '100%'
									}"
				>
				</div>
			</a>
			<a :href="crossPromoObj.url"
			   class="crossPromo__play rules__goBg"
			   target="_blank"
				@click="clickPromo"
			>
				Играть
			</a>

		</div>

		<div class="infoAboutCopy">Скопировано</div>


	</div>


</template>


<script>
import './styles/styles.scss';
import './styles/stylesBg1.scss';
import './styles/stylesBg2.scss';
import './styles/stylesBg3.scss';
import './styles/stylesHalloween.scss';
import './styles/stylesNewYear.scss';
import './styles/stylesSpring.scss';
import './styles/stylesCave.scss';
import './styles/stylesValentines.scss';
import './styles/stylesGreen.scss';
import './styles/stylesNewYear2024.scss';
import './styles/endGame.scss';

import './styles/stylesLocations.scss';
// import './styles/stylesDarkTheme.scss';
import {allWordsRU} from './russianWords';
import {dictionaryRU} from './russianDictionary';
import {newWordsFromWords} from "./russianNewWordsFromWords";
import {allWordsEN} from './englishWords';
import {wordsFromWordsEN} from './englishWordsFromWords'
// import {getBusinessEvent} from "./gameAnalytics";
import {wordsList} from './wordsList';
import {locationWords} from "./locationWords";
import {whyBadWord} from './whyBadWord';
import CrossComponent from './cross';
import CrossVue from "@/cross";
const indexMapWordList = {};
wordsList.forEach((value, i) => {
	indexMapWordList[value] = i;
});

console.log("PLATFORM: ", process.env.PLATFORM);
function decodeDelta(deltas) {
	const arr = [deltas[0]];
	for (let i = 1; i < deltas.length; i++) {
		arr.push(arr[i-1] + deltas[i]);
	}
	return arr;
}
function decodeNewWordsFromWords(){
	let a = new Date();
	Object.keys(newWordsFromWords).forEach(key => {
		newWordsFromWords[key] =  decodeDelta(newWordsFromWords[key]);
	})
}
decodeNewWordsFromWords();
function getNewWordsFromWords(){
	let wfww = {};
	Object.keys(newWordsFromWords).forEach((word) => {
		newWordsFromWords[word].forEach((lvl)=>{
			let lvlWord = allWordsRU[lvl];
			if(wfww[lvlWord]){
				wfww[lvlWord].push(word);
			}else{
				wfww[lvlWord] = [word];
			}
		})
	})
	// params({'getNewWordsFromWords': t2-t1});
	return wfww;
}
let wordsFromWordsRU = getNewWordsFromWords();
document.oncontextmenu = function(e){
	stopEvent(e);
}
function stopEvent(event){
	if(event.preventDefault !== undefined)
		event.preventDefault();
	if(event.stopPropagation !== undefined)
		event.stopPropagation();
}
//
// let allCount = 0;
// locationWords.event.forEach(w => {
// 	locationWords.wordsFromWords[w].forEach(v => {
// 		allCount += v.length;
// 	})
// });
// console.log('ALL');
// console.log(allCount);

let deleteBlockBg = true;
// function stylesBgThen(){
// 	console.log('Bg update');
// 	deleteBlockBg = true;
// 	update();
// }
//
// function importBg(bg, isUpdate){
// 	try{
// 		if(bg === 1){
// 			import('./stylesBg1.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
// 		else if(bg === 2){
// 			import('./stylesBg2.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
// 		else if(bg === 3){
// 			import('./stylesBg3.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
//
// 	}catch(e){}
//
// }
var wordsFromWords = wordsFromWordsRU,
	allWords = allWordsRU,
	dictionary = dictionaryRU;
let repeatedWordSign = '1';
let repeatedWords = {};
allWords.forEach((word, index) => {
	if(word.indexOf(repeatedWordSign) !== -1){
		let fixedWord = fixWordToNormal(word);
		repeatedWords[allWords.indexOf(fixedWord)] = index;
	}
})
let advTime = false;
let startAdvTime = false;
setTimeout(()=>{
	advTime = true;
	startAdvTime = true;
}, 30000);
let showAdv, playerGame, payments, YSDK;

params({'tryToOpen': 1});
let firstTimeOpen = new Date();


//Компрессор
var LZString = function () {
	function o(o, r) {
		if (!t[o]) {
			t[o] = {};
			for (var n = 0; n < o.length; n++) t[o][o.charAt(n)] = n
		}
		return t[o][r]
	}

	var r = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = {
			compressToBase64: function (o) {
				if (null == o) return "";
				var r = i._compress(o, 6, function (o) {
					return n.charAt(o)
				});
				switch (r.length % 4) {
					default:
					case 0:
						return r;
					case 1:
						return r + "===";
					case 2:
						return r + "==";
					case 3:
						return r + "="
				}
			}, decompressFromBase64: function (r) {
				return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
					return o(n, r.charAt(e))
				})
			}, compressToUTF16: function (o) {
				return null == o ? "" : i._compress(o, 15, function (o) {
					return r(o + 32)
				}) + " "
			}, decompressFromUTF16: function (o) {
				return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
					return o.charCodeAt(r) - 32
				})
			}, compressToUint8Array: function (o) {
				for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
					var s = r.charCodeAt(e);
					n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256
				}
				return n
			}, decompressFromUint8Array: function (o) {
				if (null === o || void 0 === o) return i.decompress(o);
				for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) n[e] = 256 * o[2 * e] + o[2 * e + 1];
				var s = [];
				return n.forEach(function (o) {
					s.push(r(o))
				}), i.decompress(s.join(""))
			}, compressToEncodedURIComponent: function (o) {
				return null == o ? "" : i._compress(o, 6, function (o) {
					return e.charAt(o)
				})
			}, decompressFromEncodedURIComponent: function (r) {
				return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
					return o(e, r.charAt(n))
				}))
			}, compress: function (o) {
				return i._compress(o, 16, function (o) {
					return r(o)
				})
			}, _compress: function (o, r, n) {
				if (null == o) return "";
				var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0;
				for (i = 0; i < o.length; i += 1) if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else {
					if (Object.prototype.hasOwnProperty.call(p, a)) {
						if (a.charCodeAt(0) < 256) {
							for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
							for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						} else {
							for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
							for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						}
						l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
					} else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
					l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u)
				}
				if ("" !== a) {
					if (Object.prototype.hasOwnProperty.call(p, a)) {
						if (a.charCodeAt(0) < 256) {
							for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
							for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						} else {
							for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
							for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						}
						l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
					} else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
					l--, 0 == l && (l = Math.pow(2, h), h++)
				}
				for (t = 2, e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
				for (; ;) {
					if (m <<= 1, v == r - 1) {
						d.push(n(m));
						break
					}
					v++
				}
				return d.join("")
			}, decompress: function (o) {
				return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
					return o.charCodeAt(r)
				})
			}, _decompress: function (o, n, e) {
				var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [], A = {val: e(0), position: n, index: 1};
				for (i = 0; 3 > i; i += 1) f[i] = i;
				for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
				switch (t = p) {
					case 0:
						for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
						l = r(p);
						break;
					case 1:
						for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
						l = r(p);
						break;
					case 2:
						return ""
				}
				for (f[3] = l, s = l, w.push(l); ;) {
					if (A.index > o) return "";
					for (p = 0, c = Math.pow(2, m), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
					switch (l = p) {
						case 0:
							for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
							f[d++] = r(p), l = d - 1, h--;
							break;
						case 1:
							for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
							f[d++] = r(p), l = d - 1, h--;
							break;
						case 2:
							return w.join("")
					}
					if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else {
						if (l !== d) return null;
						v = s + s.charAt(0)
					}
					w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++)
				}
			}
		};
	return i
}();

function chooseRightWordFromWords(word){
	let fixedWord = fixWordToNormal(word);
	return wordsFromWords[fixedWord];
}

function replaceLevelsToOne(data, isLocationLevels){
	let keys = Object.keys(data);
	const newData = {};
	keys.forEach((key)=>{
		try{
			let len;
			if(isLocationLevels) len = locationWords.wordsFromWords[key].length;
			else len = chooseRightWordFromWords(key).length;
			if(data[key].length === len){
				newData[key] = 1;
			}else{
				newData[key] = data[key].slice();
			}
		}catch(ignored){}
	});
	return newData;
}
function compressDataObj(wordsFromWords){
	try{
		const newData = {};
		const doneLevels = [];
		Object.keys(wordsFromWords).forEach(el => {
			let lvl = allWords.indexOf(el);
			if(wordsFromWords[el] === 1){
				doneLevels.push(lvl);
				return;
			}
			wordsFromWords[el].forEach(w => {
				if(newData[w]){
					newData[w].push(lvl);
				}else{
					newData[w] = [lvl];
				}
			})
		});
		newData.doneLevels = doneLevels;
		return newData;
	}catch(e){
		return wordsFromWords;
	}

}
function decompressDataObj(compressedWords){
	const data = {};
	const dl = compressedWords.doneLevels;
	if(dl){
		for(let i = 0; i < dl.length; i++){
			data[ allWords[dl[i]] ] = 1;
		}
	}
	const midData = {};
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels') return;

		compressedWords[el].forEach(l => {
			if(midData[l]){
				midData[l].push(el);
			}else{
				midData[l] = [el];
			}
		})
	});
	Object.keys(midData).forEach(el => {
		data[allWords[el]] = midData[el];
	})

	// for(let i = 0; i < allWords.length; i++){
	//   if(data[allWords[i]] === undefined){
	//     data[allWords[i]] = [];
	//   }
	// }

	return data;
}
function compressDoneLevels(levels){
	let newLevels = [];
	let stringStart = false;
	levels.forEach((level, index) => {
		if(level+1 === levels[index+1]){
			if(stringStart === false){
				stringStart = level;
			}
		}else{
			if(stringStart !== false){
				newLevels.push(stringStart + '-' + level);
				stringStart = false;
			}else{
				newLevels.push(level);
			}
		}
	})
	return newLevels;
}
function decompressDoneLevels(levels){
	let newLevels = [];
	levels.forEach((level)=>{
		if(Number.isInteger(level)){
			newLevels.push(level);
		}else{
			let startAndEnd = level.split('-');
			for(let i = Number(startAndEnd[0]); i <= Number(startAndEnd[1]); i++){
				newLevels.push(i);
			}
		}
	})
	return newLevels
}
function isNumeric(value) {
	value = String(value);
	return !isNaN(value) && value.trim() !== "";
}
function decompressLocationData(locationData){
	let newLocationDoneWords = {};
	Object.keys(locationData).forEach((key) => {
		let newKey = key;
		if(isNumeric(key)){
			newKey = wordsList[Number(key)];
		}
		let arr = locationData[key];
		let newArr = [];
		if(arr === 1){
			newArr = 1;
		}else{
			arr.forEach(el => {
				if(isNumeric(el)){
					newArr.push(wordsList[Number(el)]);
				}else{
					newArr.push(el);
				}
			})
		}
		newLocationDoneWords[newKey] = newArr;
	})
	return newLocationDoneWords;
}

function compressLocationData(locationData){
	let newLocationDoneWords = {};
	Object.keys(locationData).forEach((key) => {
		let wIndex = indexMapWordList[key];
		let arr = locationData[key];
		let newArr = [];
		if(arr === 1){
			newArr = 1;
		}else{
			arr.forEach(el => {
				let wIndexArr = indexMapWordList[el];
				if(wIndexArr !== undefined){
					newArr.push(wIndexArr);
				}else{
					newArr.push(el);
				}
			})
		}
		if(wIndex !== undefined){
			newLocationDoneWords[wIndex] = newArr;
		}else{
			newLocationDoneWords[key] = newArr;
		}
	})
	return newLocationDoneWords;
}

function compressData(data, isLocationData){
	//Если заполнены все слова, уровень - 1
	if(data === null || data === undefined) return {};

	let newData =  replaceLevelsToOne(data, isLocationData);
	if(!isLocationData){
		newData = compressDataObj(newData);
		newData = newCompress(newData);
	}else{
		newData = compressLocationData(data);
	}
	return newData;
	// console.log(newData);
	// return LZString.compressToUTF16(JSON.stringify(newData));
}
function findMax(arr){
	if(arr.length === 0) return 0;
	const max = arr.reduce((acc, val) => {
		return val > acc ? val : acc;
	}, arr[0]);
	return max;
}
function decompressData(data, isEnglishVersion){
	let newData = data;
	if(typeof newData === "string"){
		newData = JSON.parse(LZString.decompressFromUTF16(data));
	}
	console.log('decompress');


	if(newData.doneLevels !== undefined){
		newData.doneLevels = decompressDoneLevels(newData.doneLevels);
		let maxLevel = findMax(newData.doneLevels);
		if(isEnglishVersion){
			if(newData.newCompress){
				newData = englishNewDecompress(newData);
			}
			newData = decompressDataObj(newData);
		}else{
			console.log('start parse');
			if(newData.deltaCompress){
				let compressedLevels = newData.compressedLevels;
				let keys = decodeDelta(compressedLevels.keys);
				keys.forEach((key, index) => {
					let wordKey = wordsList[key];
					newData[wordKey] = compressedLevels.values[index];
				})
				delete newData.compressedLevels;
				delete newData.deltaCompress;
				newData.newCompress = true;
				newData.notStringed = true;
			}
			console.log('parse');
			console.log(newData);

			if(newData.newCompress){
				newData = newDecompress(newData, maxLevel);
			}else{
				newData = decompressDataObj(newData);
			}
		}

	}
	console.log(newData);
	return newData;
}

function findMaxInArr(arr){
	let max = 0;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > max) max = arr[i];
	}
	return max;
}
//Сохраняем только последний уровень, на котором есть данное слово

function encodeDelta(arr) {
	if (arr.length === 0) return [];
	const deltas = [Number(arr[0])];
	for (let i = 1; i < arr.length; i++) {
		let n1 = Number(arr[i]);
		let n2 = Number(arr[i-1]);
		deltas.push(n1-n2);
	}
	return deltas;
}
function newCompress(compressedWords){
	let data = {};
	let middleObject = {};
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels') return;
		let maxInArr = findMaxInArr(compressedWords[el]);
		let wIndex = indexMapWordList[el];
		if(wIndex !== undefined){
			middleObject[wIndex] = maxInArr;
		}
		// data[el] = maxInArr;

	});
	let keys = encodeDelta(Object.keys(middleObject));
	let values = Object.values(middleObject);
	compressedWords.doneLevels.sort((a,b)=> a-b);
	data.doneLevels = compressDoneLevels(compressedWords.doneLevels);
	let compressedLevels = {
		keys: keys,
		values: values
	};
	data.compressedLevels = compressedLevels;
	data.deltaCompress = true;
	// data.newCompress = true;
	// data.notStringed = true;
	return data;
}
function newDecompress(compressedWords, maxLevel){
	let t1 = new Date();
	let doneWords = {};

	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels' || el === 'notStringed' || el === 'newCompress') return;
		let lastLevel = compressedWords[el];
		if(lastLevel > maxLevel) maxLevel = lastLevel;
	});

	console.log('maxlevel', maxLevel);

	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels' || el === 'notStringed' || el === 'newCompress') return;
		if(newWordsFromWords[el]){
			let lastLevel = compressedWords[el];
			for(let i = 0; i < newWordsFromWords[el].length; i++){
				let lvl = newWordsFromWords[el][i];
				if(lvl > lastLevel) break;


				let repeatedLevel = repeatedWords[lvl];
				if(repeatedLevel && repeatedLevel <= maxLevel){
					if(!compressedWords.doneLevels.includes(repeatedLevel)){
						let repeatedLevelWord = allWords[repeatedLevel];
						if(doneWords[repeatedLevelWord]){
							doneWords[repeatedLevelWord].push(el)
						}else{
							doneWords[repeatedLevelWord] = [el];
						}
					}

				}

				if(compressedWords.doneLevels.includes(lvl)) continue;

				let lvlWord = allWords[lvl];
				if(doneWords[lvlWord]){
					doneWords[lvlWord].push(el)
				}else{
					doneWords[lvlWord] = [el];
				}
			}
		}
	});

	compressedWords.doneLevels.forEach(doneLevel => {
		doneWords[allWords[doneLevel]] = 1;
	});

	let t2 = new Date();
	console.log('New Descompress Time: ', t2 - t1);

	return doneWords;
}

function englishNewDecompress(compressedWords){
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels' || el === 'notStringed' || el === 'newCompress') return;
		let lastLevel = compressedWords[el];
		let newArr = [];
		for(let i = 0; i <= lastLevel; i++){
			if(compressedWords.doneLevels.includes(i)) continue;
			//i - уровень. Если слово есть на уровне, добавляем его
			if(wordsFromWords[allWords[i]].includes(el)){
				newArr.push(i);
			}
		}
		compressedWords[el] = newArr;
	});
	delete compressedWords.newCompress;
	delete compressedWords.notStringed;

	return compressedWords;
}




const lastVersion = "ver-49";
// Поиск слова
// let length = 0;
// for(let i = 0; i < allWords.length; i++){
//   if(wordsFromWords[allWords[i]].length > length){
//     length = wordsFromWords[allWords[i]].length;
//     console.log(allWords[i], length);
//   }
// }
// console.log(allWords.length, Object.keys(wordsFromWords).length);
// for(let i = 0; i < allWords.length; i++){
//   if(wordsFromWords[allWords[i]]){
//     console.log('true');
//   }else{
//     console.log('false');
//   }
// }
// let wordsCount = {};
// let allWordss = [];
// for(let key in wordsFromWords){
//   for(let i = 0; i < wordsFromWords[key].length; i++){
//     let w = wordsFromWords[key][i];
//     if(!allWordss.includes(w)){
//       allWordss.push(w);
//     }
//
//     if(wordsCount[w]) wordsCount[w]++;
//     else wordsCount[w] = 1;
//   }
// }
// setToStorage('bigstr1', JSON.stringify(allWordss));
// var sortable = [];
// for (var vehicle in wordsCount) {
//   sortable.push([vehicle, wordsCount[vehicle]]);
// }
//
// sortable.sort(function(a, b) {
//   return b[1] - a[1];
// });
// const newArr = [];
// for(let i = 150; i < 300; i++){
//   newArr.push(sortable[i][0]);
// }
// wordsFromWords["fls"] = newArr;
// let str = '';
// for(let i = 0; i <  sortable.length; i++){
//   if(sortable[i][1] >= 2){
//     str += sortable[i][0] + ', ';
//   }
// }
//
// setToStorage('bigstr', str);


function getFromStorage(name) {
	try {
		let val = localStorage.getItem(name);
		if (val) return val;
	} catch (e) {}
}

function setToStorage(name, val) {
	try {
		if(name === 'allDoneWords'){
			if(notRussianGame){
				localStorage.setItem('allDoneWordsEN', JSON.stringify(val));
			}else{
				let test1 = new Date();
				localStorage.setItem(name, JSON.stringify(compressData(val)));
				let test2 = new Date();
				// console.log('test end', test2-test1);
			}
			return;
		}else if(name === 'tips' && notRussianGame){
			localStorage.setItem('tipsEN', val);
			return;
		}
		localStorage.setItem(name, val);
	} catch (e) {}
}

let notRussianGame = false;

let PLAYESTATE = {};
let PLAYERSTATS = {};
let doDeleteBlock;
let crossPromoName = 'crossPromoCrypto';
let allDoneWords = getFromStorage('allDoneWords');
let locationDoneWords = getFromStorage('locationDoneWords');
let tips = getFromStorage('tips');
let sounds = getFromStorage('sounds');
let isMusic = getFromStorage('isMusic');
let isLastSounds = getFromStorage('lastSounds');
let isAdvShowed = getFromStorage('isAdvShowed');
let isGameAdvShow = getFromStorage('isGameAdvShow');
let isGameUpdate = getFromStorage('gameUpdate-1');
let chosenBackground = getFromStorage('chosenBackground');
let portraitAdviceAmount = getFromStorage('portraitAdviceAmount');
let isLvlFiveHintDone = getFromStorage('isLvlFiveHintDone');
let savedMyGame = getFromStorage('savedMyGame');
let savedGameForTwo = getFromStorage('savedForTwo');
let crossPromoShows = getFromStorage(crossPromoName);
let infoAboutMyGame = getFromStorage('infoAboutMyGame');
let infoAboutGameForTwo = getFromStorage('infoAboutGameForTwo');
let infoAboutClosedEvent = !!getFromStorage('infoAboutClosedEvent2');
let infoAboutEvent = !!getFromStorage('infoAboutEvent');
let gotEventBfGift = !!getFromStorage('gotEventBfGift');
if(savedMyGame){
	try{
		savedMyGame = JSON.parse(savedMyGame);
	}catch(e){
		savedMyGame = false;
	}
}
if(savedGameForTwo){
	try{
		savedGameForTwo = JSON.parse(savedGameForTwo);
	}catch(e){
		savedGameForTwo = false;
	}
}
if(infoAboutMyGame){
	infoAboutMyGame = Number(infoAboutMyGame);
	if(!Number.isInteger(infoAboutMyGame)) infoAboutMyGame = 0;
}else{
	infoAboutMyGame = 0;
}
if(infoAboutGameForTwo){
	infoAboutGameForTwo = Number(infoAboutGameForTwo);
	if(!Number.isInteger(infoAboutGameForTwo)) infoAboutGameForTwo = 0;
}else{
	infoAboutGameForTwo = 0;
}
if(crossPromoShows){
	crossPromoShows = Number(crossPromoShows);
}else{
	crossPromoShows = 0;
}
if(chosenBackground){
	chosenBackground = Number(chosenBackground);
	params({'newChosenBG': chosenBackground});
	// importBg(chosenBackground, true);
}else{
	chosenBackground = -3;
	setToStorage('chosenBackground', chosenBackground);
	// deleteBlockBg = true;
}
try{
	localStorage.removeItem('eventProgress');
}catch(e){}

// params({'chosenBackground': chosenBackground});

let russianProgressSave = {};
let englishProgress = false;
let russianTips = false;
let englishTips = false;

let lastProgressUpdate = getFromStorage('time');
if(lastProgressUpdate) lastProgressUpdate = Number(lastProgressUpdate);
else lastProgressUpdate = 0;

let cantSaveData = false;

isAdvShowed = !!isAdvShowed;
isGameUpdate = !isGameUpdate;
let loc = 0;
let allStars = [];
let isRules = false;
let lvlsOnPage = 18;
if(window.innerHeight > window.innerWidth){
	lvlsOnPage = 20;
}
let allLocations = Math.floor(allWords.length / lvlsOnPage);
window.addEventListener("resize", function() {
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("changeOrientation"));
	}

}, false);
let lastLevel = 0;
let wordsForReplace = {
	'ассиметрия': 'асимметрия',
	'гитлеровец': 'горицвет',
	'барашкин': 'банкирша',
	'подмывание': 'домывание',
	'карпенко': 'анкерок',
	'прибалтика': 'парилка',
	'квашнин': 'шинка',
	'минотавр': 'норматив',
	'франциско': 'фонарик',
	'барселона': 'балансер',
	'синестрол': 'солитер',
	'головчинер': 'невролог',
	'гончаренко': 'кочегар',
	'скрижапель': 'скрижаль',
	'ленинград': 'гренадин',
	'костылева': 'выселок',
	'опанасенко': 'поноска',
	'распутина': 'парусина',
	'таблеточка': 'таблетка',
	'обругание': 'абориген',
	'злотникова': 'котлован',
	'пронякина': 'канонир',
	'буратино': 'трибуна',
	'корнилова': 'ковролин',
	'оскопление': 'поколение',
	'богоматерь': 'теоброма',
	'напрокат': 'патронка',
	'спидофобка': 'подсобка',
	'гренландия': 'гардения',
	'морфинист': 'трином',
	'кокаинист': 'скотник',
	'наркомафия': 'марафон',
	'рейхсканцлер' : 'канцлер',
	'концлагерь' : 'нагорье',
	'украинизация': 'рязанка',
	'украинизм': 'карниз',
	'выработки': 'выборка',
	'правовeдение': 'опадение',
	'александрова': 'расклад',
	'кондратьевна': 'редька',
	'митрофанушка': 'матушка',
	'интерпол': 'понтер',
	'чередниченко': 'очернение',
	'чехословакия': 'лосиха',
	'онанирование': 'нирвана',
	'рукоблудие': 'ледоруб',
	'скотоложство': 'восток'

};
function fixDoneWords(allDoneWords, isLocationWords) {
	let keys = Object.keys(allDoneWords);
	console.log('fixDoneWords. isLocationWords: ', isLocationWords);
	for(let i = 0; i < keys.length; i++){

		let k = keys[i];
		if(keys[i].indexOf('ё') !== -1){
			k = k.replace(/ё/g, 'е');
			console.log(k);
		}else if(wordsForReplace[k] && !isLocationWords){
			k = wordsForReplace[k];
			if(k === 'подмывание' && i > 5000){
				k = 'своенравие';
			}else if(k === 'минотавр' && i > 5000){
				k = 'порядовка';
			}else if(k === 'кондратьевна' && i > 5000){
				k = 'адвокат';
			}
		}
		let words = allDoneWords[keys[i]] || allDoneWords[k];



		if((k === 'трином' || k === 'морфинист') && allDoneWords[allWords[1078]] && (allDoneWords[allWords[1078]] === 1 || allDoneWords[allWords[1078]].length > 0) ){
			words = 1;
		}


		if(words === undefined){
			delete  allDoneWords[keys[i]];
		}else if(words === 1){
			if(isLocationWords){
				if(locationWords.wordsFromWords[k]){
					allDoneWords[k] = locationWords.wordsFromWords[k];
				}else{
					delete allDoneWords[keys[i]];
				}


			}else{
				allDoneWords[k] = chooseRightWordFromWords(k);
			}

		 	if(wordsForReplace[keys[i]]){
				delete allDoneWords[keys[i]];
			}
		}else{
			if(keys[i].indexOf('ё')  !== -1){
				words = words.map((word)=>word.replace(/ё/g, 'е'));
			}

			delete allDoneWords[keys[i]];

			if(words.length > 0){
				let allWords = chooseRightWordFromWords(k);
				if(isLocationWords){
					allWords = locationWords.wordsFromWords[k];
				}

				if(allWords){
					words = words.filter((word)=>allWords.includes(word));
					allDoneWords[k] = words;
				}

			}
		}


	}
	return allDoneWords;
}


let newYearProgress = getFromStorage('newYearProgress');
if(newYearProgress){
	newYearProgress = fixDoneWords(JSON.parse(newYearProgress), true);
}else{
	newYearProgress = {};
}

function getEventScore(newYearProgress){
	let score = 0;
	Object.keys(newYearProgress).forEach((key) => {
		if(newYearProgress[key] === 1){
			if(locationWords.wordsFromWords[key]){
				for(let i = 0; i < locationWords.wordsFromWords[key].length; i++){
					score += locationWords.wordsFromWords[key].length;
				}
			}
		}else{
			for(let i = 0; i < newYearProgress[key].length; i++){
				score += newYearProgress[key][i].length;
			}
		}
	})
	return score;
}
let thatTips = 15;
if(allDoneWords){
	allDoneWords = JSON.parse(allDoneWords);
	if(allDoneWords.newCompress || allDoneWords.deltaCompress) allDoneWords = decompressData(allDoneWords);
	console.log('true', allDoneWords['милость1']);
	allDoneWords = fixDoneWords(allDoneWords);
	console.log('true2', allDoneWords['милость1']);
	tips = Number(tips);
	thatTips = tips;
	if(!Number.isInteger(tips)) tips = 15;
	sounds = sounds === 'true';
	isMusic = isMusic === 'true';
	params({'isSounds': sounds});
	params({'isMusic': isMusic});
	isLastSounds = isLastSounds === 'true';
	setLoc();
	isGameAdvShow = !isGameAdvShow;

	// PLAYESTATE.allDoneWords = allDoneWords;
}else{

	allDoneWords = {};
	isGameAdvShow = false;
	isGameUpdate = false;
	tips = 10;
	isRules = true;
	sounds = true;
	isMusic = false;
	if(chosenBackground === 6) isMusic = true;
	setToStorage('sounds', sounds);
	setToStorage('isMusic', isMusic);
	allWords.forEach((key => {
		allDoneWords[key] = [];
	}));
	for(let i = 0; i < allWords.length; i++){
		allStars.push(0);
	}

}
if(locationDoneWords){
	locationDoneWords = fixDoneWords(decompressLocationData(JSON.parse(locationDoneWords)), true);
}else{
	locationDoneWords = {};
}
try{
	if (getFromStorage('allDoneWordsEN')) {
		isRules = false;
	}
}catch(e){}

let navigatorBrowser = (function(){
	try{
		var ua= navigator.userAgent;
		var tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
			if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	}catch(e){
		return 'No browser';
	}
})();





let recentState = JSON.stringify(PLAYESTATE);
let recentStats = JSON.stringify(PLAYERSTATS);

let showUpdate = false;
let lastUpdate = getFromStorage('wasUpdate');
if(lastUpdate !== lastVersion && lastLevel > 0) {
	showUpdate = true;
	console.log(lastVersion + '; showUpdate: ', showUpdate);
}
setToStorage('wasUpdate', lastVersion);

function getSec(){
	let date = new Date();
	return date.getTime()
}
let recentEventState = JSON.stringify(newYearProgress);
let recentLocationState = JSON.stringify(locationDoneWords);
let saveTime = -1;
function setState(isNow) {
	if(process.env.PLATFORM === 'yandex'){
		const newData = JSON.stringify(PLAYESTATE);
		const newData2 = JSON.stringify(newYearProgress);
		if(recentState === newData && recentEventState === newData2 && !isNow) return;
		recentState = newData;

		if (playerGame) {

			if(notRussianGame){
				console.log(PLAYESTATE);
				const newState = {
					allDoneWords: russianProgressSave,
					allDoneWordsEN: compressData(PLAYESTATE.allDoneWords)
				};
				newState.gotEventBfGift = gotEventBfGift;
				if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true);
				if(newYearProgress) newState.newYearProgress = compressData(newYearProgress, true);
				playerGame.setData(newState, true).then(() => {}).catch((ignored) => {})


			}else{
				// console.log(PLAYESTATE);
				// console.log(fixDoneWords(JSON.parse(getFromStorage('allDoneWords'))));
				const newState = {
					allDoneWords: compressData(PLAYESTATE.allDoneWords)
				};
				newState.gotEventBfGift = gotEventBfGift;
				if(englishProgress) newState.allDoneWordsEN = englishProgress;
				if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true);
				if(newYearProgress) newState.newYearProgress = compressData(newYearProgress, true);
				// console.log('SendState');
				// console.log(newState);createGameLevel
				if(newState.allDoneWords === undefined && lastLevel > 0){
					params({'allWords-NO': 1});
					if(PLAYESTATE.allDoneWords === undefined){
						params({'PLAYERSTATE-NO': 1});
						params({'browserLag': navigatorBrowser});
						if(allDoneWords === undefined){
							params({'allDoneWords-NO': 1});
						}else{
							PLAYESTATE.allDoneWords = allDoneWords;
							newState.allDoneWords = compressData(allDoneWords)
						}
					}
				}
				playerGame.setData(newState, false).then(() => {console.log('data saved')}).catch((error) => {
					try{
						params({'cantSave-first': error});
						params({'cantSave-err': error.toString().slice(0,150)});
						console.log(error)
						if(error.toString().includes('large')){
							params({'cantSave-bigData-first': lastLevel});
						}
					}catch(ignored){}
					playerGame.setData(newState, true).then(() => {}).catch((ignored) => {})
				});
			}


		}
	}else if(process.env.PLATFORM === 'gp'){
		saveTime++;
		if(saveTime === 10) saveTime = 0;
		if(saveTime !== 0 && !isNow){
			return;
		}else{
			saveTime = 0;
		}

		const newData = JSON.stringify(allDoneWords);
		const newLocationData = JSON.stringify(locationDoneWords);
		let isChange = false;
		if(recentState !== newData){
			recentState = newData;
			const newState = compressData(allDoneWords);
			if(GP) GP.player.set('allDoneWords', JSON.stringify(newState));
			isChange = true;
		}
		if(recentLocationState !== newLocationData){
			recentLocationState = newLocationData
			const newState = compressData(locationDoneWords, true);
			isChange = true;
			if(GP) GP.player.set('locationDoneWords', JSON.stringify(newState));
		}
		if(isChange) {
			try{
				GP.player.sync();
				console.log('sync');
				setToStorage('platformType', platformType);
			}catch(e){}

		}
	}
}
function setStats() {
	// console.log('setStats');
	if(process.env.PLATFORM === 'yandex'){
		const newData = JSON.stringify(PLAYERSTATS);
		if(recentStats === newData) return;
		recentStats = newData;
		if(playerGame){
			if(notRussianGame){
				const progress = {tipsEN: PLAYERSTATS.tips};
				if(russianTips) progress.tips = russianTips;
				playerGame.setStats(progress, false).then((ignored) => {}).catch((ignored)=>{});
			}else{
				const progress = {tips: PLAYERSTATS.tips};
				if(englishTips) progress.tipsEN = englishTips;

				if(progress === undefined || progress.tips === undefined){
					params({'tipsUndefined': 1});
				}

				playerGame.setStats(progress, false).then((ignored) => {}).catch(()=>{
					playerGame.setStats(progress, true).then((ignored) => {})
				});
			}

		}
	}else if(process.env.PLATFORM === 'gp'){
		const newData = JSON.stringify(PLAYERSTATS);
		if(recentStats === newData) return;
		if(GP){
			try{
				GP.player.set('tips', PLAYERSTATS.tips);
				GP.player.sync();
			}catch(e){}
		}
	}
}

function saveAllData(isNow){
	setState(isNow);
	setStats(isNow);
}





function setLastLevel(getLastLevel, words) {
	for(let i = allWords.length-1; i >= 0 ; i--){
		if(getLastLevel){
			if(words[allWords[i]] && words[allWords[i]].length > 0){
				return i;
			}
		}else{
			if(allDoneWords[allWords[i]] && allDoneWords[allWords[i]].length > 0){
				console.log('last level, ', i);
				lastLevel = i;
				break;
			}
		}

	}
}

function getAllStars(allDoneWords){
	let allStars = 0;
	allWords.forEach((key => {
		if(allDoneWords[key]){
			allStars += testStar(allDoneWords[key].length, chooseRightWordFromWords(key).length);
		}
	}));
	console.log('all stars', allStars);
	return allStars;
}
function getLocationStars(currentLocation){
	let allStars = [];
	let allWords = locationWords[currentLocation];
	allWords.forEach((key => {
		try{
			if(currentLocation === 'event'){
				if(newYearProgress[key]){
					allStars.push(testStar(newYearProgress[key].length, locationWords.wordsFromWords[key].length));
				}else{
					allStars.push(0);
				}
			}else{
				if(locationDoneWords[key]){
					allStars.push(testStar(locationDoneWords[key].length, locationWords.wordsFromWords[key].length));
				}else{
					allStars.push(0);
				}
			}

		}catch(e){}
	}));
	return allStars;
}

function setLoc() {
	allWords.forEach((key => {
		try{
			if(allDoneWords[key]){
				allStars.push(testStar(allDoneWords[key].length, chooseRightWordFromWords(key).length))
			}else{
				allDoneWords[key] = [];
				allStars.push(0);
			}
		}catch(e){}
	}));
	setLastLevel();
	loc = Math.floor((lastLevel / lvlsOnPage));
	// if(allStars.reduce((acc, st)=>{
	// 	return acc + st;
	// }, 0) < loc*32){
	// 	loc--;
	// }
	if(loc >= allLocations || loc < 0) loc = 0;
}

let ruLangs = ['ru', 'be', 'kk', 'uk', 'uz', 'kz'];

let payloadLevel = false;
let payloadVertical = false;
let playerPlayedAlready = false;

let isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let advTimeout = 0;
let advInterval = 0;
let timeToShowAdv = 20;

function startAdvInterval(){
	advInterval = setInterval(()=>{
		timeToShowAdv -= 5;
		if(timeToShowAdv <= 5){
			timeToShowAdv = 5;
			clearInterval(advInterval);
		}
	}, 5000);
}
let testMobile = false;
try{
	testMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
}catch(e){}
let advErrorsTimes = 0;
let ysdkFlags;
let allGamesInfo = []
let crossPromoObj;
function getAllGames(){
	console.log('all games');
	const games = [435796,100008,99049,99196,294197,313411];
	games.forEach(id => {
		getGameObj(id);
	})
}

function getGameObj(id){
	try{
		YSDK.features.GamesAPI.getGameByID(id).then(({isAvailable, game}) => {
			console.log('game', id, isAvailable);
			if (isAvailable) {
				allGamesInfo.push(game);
				if(id === 435796) crossPromoObj = game;
			} else {
				return undefined
			}
		}).catch(err => {
			console.log(err);
			return undefined
		})
	}catch(e){
		console.log('eerr');
		return undefined
	}

}
let isGameOpen = false;
let platformType = 'VK';
let toggleSubscribeCompleted = false;
let lastPlatformType = getFromStorage('platformType');
if(process.env.PLATFORM === 'yandex'){
	if(window.YaGames){
		window.YaGames.init({
			adv: {
				onAdvClose: wasShown => {
					// if(!wasShown) {
					// 	advTime = true;
					// }

					canShowAdv();
				}
			}
		}).then(ysdk => {
			YSDK = ysdk;
			getAllGames();
			console.log('time: ', new Date() - openTime);
			ysdk.getFlags().then(flags => {
				console.log('Флаги')
				console.log(flags);
				ysdkFlags = flags;
			});
			try{
				console.log("LANG: ", ysdk.environment.i18n.lang);
				notRussianGame = !ruLangs.includes(ysdk.environment.i18n.lang);
				switchOnLoading(notRussianGame);
				if(notRussianGame){
					console.log('EN');
					lastLevel = 0;
					params({'eng': 1});
					switchToEnglishVersion();
				}else{
					console.log('RU')
				}

				//Payload
				let lvl = ysdk.environment.payload;
				console.log('PAYLOAD');
				console.log(lvl);
				if(lvl && Number(lvl)){
					let str = String(lvl);
					if(str.indexOf('ver') === 0){
						lvl = str.slice(3);
						payloadVertical = true;
						params({'payloadVertical': 1});
					}
					payloadLevel = Number(lvl) - 1;
					if(!Number.isInteger(payloadLevel)) payloadLevel = 0;
					if(payloadLevel < 0) payloadLevel = 0;
					else if(payloadLevel > 2500) payloadLevel = 2500;
					if(lastLevel !== 0){
						playerPlayedAlready = true;
					}
				}
			}catch(ignored){}


			initPlayer(ysdk);
			var isNativeCache = ysdk.yandexApp && ysdk.yandexApp.enabled;
			if ('serviceWorker' in navigator && !isNativeCache) {
				window.onload = function(){
					navigator.serviceWorker
						.register('sw.js')
						.then(function(reg) {
							console.log('Registration succeeded. Scope is ' + reg.scope);
						})
						.catch(function(error) {
							console.error('Trouble with sw: ', error);
						});
				};
			}
			showAdv = (onCloseFunc) => {
				console.log('showAdv');
				ysdk.adv.showFullscreenAdv({
					callbacks: {
						onOpen: function(){
							switchOffMainMusic();
							musicStoppedByAdv = true;
						},
						onClose: function(wasShow) {
							console.log('close adv');
							switchOnMainMusic();
							musicStoppedByAdv = false;
							if(!wasShow){
								advTime = advErrorsTimes <= 3;
							}else{
								// if(isPhone){
								// 	params({'showMobileAdv': 1});
								// }else{
								// 	params({'showDesktopAdv': 1});
								// }
								clearTimeout(advTimeout);
								clearInterval(advInterval);

								startAdvInterval();

								advTimeout = setTimeout(()=>{
									advTime = true;
									clearInterval(advInterval);
									canShowAdv();
								}, 90000);


								onCloseFunc();
							}

							canShowAdv();
						},
						onError: function (e){
							advErrorsTimes++

							advTime = advErrorsTimes <= 3;
							canShowAdv();
							console.log('error adv')
							console.log(e);
						}
					}
				});
			};
		}).catch(e=>{
			console.log(e);
			doDeleteBlock = true;
			update();
		});
	}else{
		doDeleteBlock = true;
	}
}else if(process.env.PLATFORM === 'gp'){
	console.log('platform GP - trying init');
	setTimeout(()=>{
		if(!isGameOpen){
			isGameOpen = true;
			update();
			params({'openGameWithoutGP': 1});
		}
	}, 12000);
	window.onGPInit = async function (gp) {
		console.log('GP init');
		GP = gp;
		platformType = gp.platform.type;
		paymentCatalog = gp.payments.products;
		console.log('Platform: ', platformType);
		params({'platform': platformType});
		gp.player.on('ready', () => {
			// params({'playerLoggedIn': gp.player.isLoggedIn});
			initPlayer(gp);
		});


		try{
			let bannerDone = false;
			let sdk = gp.platform.getSDK();

			function showBanner(){
				console.log('show Banner');
				if(!bannerDone){
					if(platformType === 'VK') {
						sdk.bridge.send('VKWebAppShowBannerAd', {
							banner_location: 'bottom',
							layout_type: 'resize'
						})
							.then((data) => {
								console.log('show banner: ', data.result)
								bannerDone = data.result;
							})
							.catch((error) => {
								// Ошибка
								console.log(error);
							});
					}
					// else{
					// 	gp.ads.showSticky();
					// }
				}


			}
			function bannerShowTrue() {
				if (document.querySelector('.levels')) {
					document.querySelector('.levels').dispatchEvent(new CustomEvent("bannerShowTrue"));
				}
			}
			function bannerShowFalse() {
				if (document.querySelector('.levels')) {
					document.querySelector('.levels').dispatchEvent(new CustomEvent("bannerShowFalse"));
				}

			}
			// gp.ads.on('sticky:start', () => {
			// 	bannerDone = true;
			// 	bannerShowTrue();
			// });
			// gp.ads.on('sticky:close', () => {
			// 	bannerDone = false;
			// 	bannerShowFalse();
			// });


			window.addEventListener("resize", function() {
				if(window.innerHeight < 600){
					if(platformType === 'VK') {
						sdk.bridge.send('VKWebAppHideBannerAd')
							.then((data) => {
								bannerDone = !data.result;
							})
							.catch((error) => {
								console.log(error);
							});
					}
					// else{
					// 	gp.ads.closeSticky();
					// }
				}else{
					showBanner();
				}

			}, false);


			if(window.innerHeight >= 600){
				showBanner();
			}




		}catch(e){
			console.log(e);
		}

		// Открыли баннер
	// 	gp.ads.on('sticky:start', () => {console.log('start')});
	// // Баннер показался на экране
	// 	gp.ads.on('sticky:render', () => {console.log('refresh')});
	// // Баннер обновился
	// 	gp.ads.on('sticky:refresh', () => {console.log('refresh')});
	// // Закрыли баннер
	// 	gp.ads.on('sticky:close', () => {console.log('close')});

		// await gp.player.ready;
		// GP.player.on('login', (success) => {
		// 	if(success){
		// 		initPlayer(GP);
		// 	}
		// });



		// await gp.ads.showPreloader();

		// gp.ads.showSticky();



		let onCloseFunc = () => {console.log('func')};
		showAdv = (func) => {
			onCloseFunc = func;
			console.log('showAdv');
			gp.ads.showFullscreen();
		};
		gp.ads.on('fullscreen:close', (wasShow) => {
			console.log('close adv');
			if(!wasShow){
				advTime = true;
			}else{
				clearTimeout(advTimeout);
				clearInterval(advInterval);

				timeToShowAdv = 150;
				startAdvInterval();

				advTimeout = setTimeout(()=>{
					advTime = true;
					clearInterval(advInterval);
					canShowAdv();
				}, 150000);


				onCloseFunc();
			}

			canShowAdv();
		});

		//Проверека покупок


		GP.payments.on('purchase', ({ product, purchase }) => {
			console.log(product);
			console.log(purchase);
			if(buyItem === 'cart_item2') TIPS = allTips[0];
			if(buyItem === 'cart_item3') TIPS = allTips[1];
			if(buyItem === 'cart_item4') TIPS = allTips[2];
			if(buyItem === 'cart_item5') TIPS = allTips[3];
			let it = buyItem;
			params({[it]: 1});
			document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
			GP.payments.consume({ tag: purchaseItemGP });
		});
		GP.payments.on('subscribe', ({ product, purchase }) => {
			console.log('subscribe', purchase);
			if (purchase.tag === 'cart_item6') {
				console.log('Отключена реклама');
				params({'disabledAdsSub': 1});
				toggleSubscribeCompleted = true;
				document.querySelector('.levels').dispatchEvent(new CustomEvent("disableAds"));

			}
		});
		GP.payments.on('unsubscribe', ({ product, purchase }) => {
			console.log('unsubscribe');
			document.querySelector('.levels').dispatchEvent(new CustomEvent("unableAds"));
		});
		GP.payments.on('error:unsubscribe', (error) => {
			console.log(error);
		});
		GP.payments.on('error:purchase', (error) => {console.log(error)});
	}
}



function globalTryShowAdv(onCloseFunc){
	if(showAdv && advTime){
		advTime = false;
		canShowAdv();
		showAdv(onCloseFunc);
		// setTimeout(()=>{
		// 	showAdv(onCloseFunc);
		// }, 1000)
		return true;
	}
	return false;
}
function update() {
	console.log('update');
	isGameOpen = true;
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("updateAll"));
	}
	if(process.env.PLATFORM === 'yandex'){
		try{
		YSDK.getPayments({ signed: false }).then(_payments => {
			_payments.getCatalog().then(catalog => paymentCatalog = catalog );
			// Покупки доступны.
			payments = _payments;
			payments.getPurchases().then(purchases => {
				purchases.forEach(consumePurchase);
			});
		}).catch(err => {
			console.log(err);
			try{
				params({'getPayments-error': err.toString().slice(0,150)});
			}catch(ignored){}
		});
	}catch(e){}
	}else if(process.env.PLATFORM === 'gp'){
		const noAdv = GP.payments.getPurchase('cart_item6');
		if(noAdv && noAdv.subscribed){
			console.log('откл рекламу при загрузке')
			document.querySelector('.levels').dispatchEvent(new CustomEvent("disableAds"));
		}
	}



}
function canShowAdv() {
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("canShowAdv"));
	}
}
function reachGoal(goal) {
	try{
		// eslint-disable-next-line no-undef
		ym(57682372,'reachGoal', goal)
		// eslint-disable-next-line no-empty
	}catch(ignored){}
}
/*Цели по времени*/
try{
	setTimeout(()=>{reachGoal('min40')}, 2400000);
	setTimeout(()=>{reachGoal('min50')}, 3000000);
}catch(e){}
let paymentCatalog = false;

function delParams(par){
	const url = new URL(document.location);
	const searchParams = url.searchParams;
	searchParams.delete(par);
	window.history.pushState({}, '', url.toString());
}

// function decompressLocationWords(locationDoneWords){
// 	let keys = Object.keys(locationDoneWords);
// 	keys.forEach((key)=>{
// 		if(locationDoneWords[key] === 1) locationDoneWords[key] = locationWords.wordsFromWords[key];
// 	});
// 	return locationDoneWords;
// }

let isPlayerAuth = false;

function getAmountLocationWords(locationWords){
	let wordsAmount = 0;
	try{
		Object.keys(locationWords).forEach((key)=>{
			wordsAmount += locationWords[key].length;
		})
	}catch(e){
		return 0;
	}
	return wordsAmount;
}
let musicStoppedByAdv = false;
function initPlayer(ysdk) {
	if(process.env.PLATFORM === 'yandex'){
		ysdk.getPlayer().then(_player => {
			console.log('get player');



			// Игрок авторизован.
			playerGame = _player;
			try{
				if(_player._personalInfo.mode === "lite" || _player.mode === "lite"){
					// params({'authLite': 1});
					console.log('Lite auth');
				}else{
					isPlayerAuth = true;
				}
			}catch(e){
				console.log(e);
			}
			console.log('PLAYER');
			console.log(playerGame);

			let someTrue = false;

			playerGame.getData(['allDoneWords', 'time', 'allDoneWordsEN', 'locationDoneWords', 'newYearProgress', 'gotEventBfGift'], false).then((dataObject) => {
				console.log(dataObject);
				if(dataObject.gotEventBfGift){
					gotEventBfGift = dataObject.gotEventBfGift;
				}
				// if(dataObject.newYearProgress){
				// 	dataObject.newYearProgress = fixDoneWords(decompressLocationWords(dataObject.newYearProgress), true);
				// 	let playerScore = getEventScore(dataObject.newYearProgress);
				// 	let lastScore = getEventScore(newYearProgress);
				// 	if(playerScore > lastScore) newYearProgress = dataObject.newYearProgress;
				// }
				if(allDoneWords && dataObject.allDoneWords){
					params({'doneWordsAll': 1});
				}else if(allDoneWords && !dataObject.allDoneWords && lastLevel > 0){
					params({'doneWordsLocal': 1});
				}
				if(notRussianGame){
					allDoneWords = {};
					PLAYESTATE = {allDoneWords: {}};
					console.log("DATA EN");
					console.log(dataObject.allDoneWordsEN);
					if(dataObject.allDoneWordsEN){
						let newData = dataObject.allDoneWordsEN;

						if(typeof newData === "string" || (typeof newData === "object" && newData.notStringed)){
							newData = decompressData(newData, true);
						}

						newData = fixDoneWords(newData);
						console.log("IS DAT");
						console.log(newData);

						PLAYESTATE = {allDoneWords: newData};
						recentState = JSON.stringify(PLAYESTATE);
						allDoneWords = newData;

					}else{
						lastLevel = 0;
					}

					if(dataObject.allDoneWords){
						russianProgressSave = dataObject.allDoneWords;
					}
				}else if (dataObject.allDoneWords) {
					isRules = false;

					if(dataObject.allDoneWordsEN) englishProgress = dataObject.allDoneWordsEN;
					console.log(dataObject);
					let newData = dataObject.allDoneWords;

					// if(dataObject.cantSaveData){
					//   cantSaveData = true;
					// }
					console.log('new data');
					console.log(newData);
					newData = decompressData(newData);
					newData = fixDoneWords(newData);
					console.log(newData);



					let fixedDoneWords = fixDoneWords(allDoneWords);
					let localStars = getAllStars(fixedDoneWords);
					let serverStars = getAllStars(newData);
					let localLevel = 0;
					let serverLevel = 0;
					try{
						localLevel = setLastLevel(true, fixedDoneWords);
						serverLevel = setLastLevel(true, newData);
					}catch(e){
						console.log(e);
					}
					console.log(localStars, serverStars, localLevel, serverLevel);
					let dataNotChanged = true;
					if(localLevel >= serverLevel && localStars >= serverStars){
						let isChange = localStars > serverStars;
						try{
							if(!isChange){
								if(localLevel === serverLevel){
									let w = allWordsRU[localLevel];
									let localWords = fixedDoneWords[w].length;
									let serverWords = newData[w].length;
									if(localWords > serverWords){
										isChange = true;
										params({'changeDataLocalEqual': 1});
										console.log('LocalWords > ServerWords');
									}
								}else if(localLevel > serverLevel){
									isChange = true;
									params({'changeDataLocalMore': 1});
								}
							}

						}catch(er){}

						if(isChange){
							console.log('CHANGE DATA TO LOCAL');
							dataNotChanged = false;
							params({'changeDataToLocal': 1});
							PLAYESTATE.allDoneWords = allDoneWords;
						}
					}

					if(dataNotChanged){
						console.log("GET SERVER DATA");
						allDoneWords = newData;
						PLAYESTATE.allDoneWords = newData;

						recentState = JSON.stringify(PLAYESTATE);
						setToStorage('allDoneWords', allDoneWords);
					}
				}

				if(dataObject.locationDoneWords){
					let serverWords = fixDoneWords(decompressLocationData(dataObject.locationDoneWords), true);
					let serverWordsAmount = getAmountLocationWords(serverWords);
					let localWordsAmount = getAmountLocationWords(locationDoneWords);

					if(serverWordsAmount > localWordsAmount){
						PLAYESTATE.locationDoneWords = 	serverWords;
						locationDoneWords = PLAYESTATE.locationDoneWords;
					}else{
						PLAYESTATE.locationDoneWords = 	locationDoneWords;
					}
				}else{
					PLAYESTATE.locationDoneWords = 	locationDoneWords;
				}
				//Вовзврат прогресса
				try{
					let pay = ysdk.environment.payload;
					if(pay){

							let lvl2 = pay.match(/zlms\d+/);
						if(lvl2) {
							console.log('change progress')
							lvl2 = Number(lvl2[0].replace('zlms', ''));
							if(lvl2){
								let newObj = {};
								for (let i = 0; i < lvl2; i++) {
									newObj[allWords[i]] = chooseRightWordFromWords(allWords[i]);
								}
								PLAYESTATE.allDoneWords = newObj;
								allDoneWords = newObj;
								setState();
								params({'zlms': lvl2});
							}

						}
						let lvl3 = pay.match(/zl\d+a\d+/);
						if(lvl3) {
							lvl3 = lvl3[0].replace('zl', '');
							if(lvl3){
								let level1 = Number(lvl3.slice(0, lvl3.indexOf('a')));
								let level2 = Number(lvl3.slice(lvl3.indexOf('a')+1));
								for (let i = level1; i < level2; i++) {
									PLAYESTATE.allDoneWords[allWords[i]] = chooseRightWordFromWords(allWords[i]);
								}
								allDoneWords = PLAYESTATE.allDoneWords;
								setState();
								// params({'zlms': lvl2});
							}

						}
					}
				}catch(e){
					console.log(e);
				}

				if(someTrue){
					update();
				}
				someTrue = true;


			}).catch((e) => {
				console.log(e);
				if(someTrue){
					update();
				}
				try{
					params({'getPlayer-error': e.toString().slice(0,150)});
				}catch(ignored){}
				someTrue = true;
			});

			playerGame.getStats(['tips', 'tipsEN'], false).then((dataObject) => {
				// console.log('StATS');
				// console.log(dataObject);
				if(notRussianGame){
					if(Number.isInteger(dataObject.tipsEN)){
						tips = dataObject.tipsEN;
					}else{
						tips = 15	;
					}
					if(dataObject.tips) russianTips = dataObject.tips;

				}else if (Number.isInteger(dataObject.tips)) {
					if(dataObject.tips > tips){
						tips = dataObject.tips;
					}
					if (dataObject.tipsEN) englishTips = dataObject.tipsEN;
				}else{
					if(!Number.isInteger(tips) || 15 > tips){
						tips = 15;
					}
					if(dataObject.tipsEN) englishTips = dataObject.tipsEN;
				}

				PLAYERSTATS = {'tips': dataObject.tipsEN};
				recentStats = JSON.stringify(PLAYERSTATS);
				setToStorage('tips', tips);

				if(someTrue){
					update();
				}
				someTrue = true;
				//Вовзврат прогресса
				try{
					let pay = ysdk.environment.payload;
					if(pay){
						let tps = pay.match(/tps\d+/);
						if(tps) {
							tps = Number(tps[0].replace('tps', ''));
							if(tps){
								tips = tps;
								PLAYERSTATS.tips = tips;
								setStats();
							}
						}
					}
				}catch(e){
					console.log(e);
				}
			}).catch((e) => {
				console.log(e);
				if(someTrue){
					update();
				}
				try{
					params({'getStats-error': e.toString().slice(0,150)});
				}catch(ignored){}
				someTrue = true;
			});
		}).catch((e) => {
			console.log(e);
			doDeleteBlock = true;
			try{
				params({'player-error': e.toString().slice(0,250)});
			}catch(ignored){}
			update();
		});
	}else if(process.env.PLATFORM === 'gp'){
		ysdk.player.on('fetchFields', (success) => {
			console.log('get player');
			if(success){
				console.log('get player success');
				playerGame = ysdk.player;
				if(ysdk.player.has('allDoneWords')){
					console.log('GP have allDoneWords')
					isRules = false;
					let newData = JSON.parse(ysdk.player.get('allDoneWords'));
					newData = decompressData(newData);
					newData = fixDoneWords(newData);




					let fixedDoneWords = fixDoneWords(allDoneWords);
					let localStars = getAllStars(fixedDoneWords);
					let serverStars = getAllStars(newData);
					let localLevel = 0;
					let serverLevel = 0;
					try{
						localLevel = setLastLevel(true, fixedDoneWords);
						serverLevel = setLastLevel(true, newData);
					}catch(e){
						console.log(e);
					}
					console.log(localStars, serverStars, localLevel, serverLevel);
					let dataNotChanged = true;
					if(localLevel >= serverLevel && localStars >= serverStars){
						let isChange = localStars > serverStars;
						try{
							if(!isChange){
								if(localLevel === serverLevel){
									let w = allWordsRU[localLevel];
									let localWords = fixedDoneWords[w].length;
									let serverWords = newData[w].length;
									if(localWords > serverWords){
										isChange = true;
										params({'changeDataLocalEqual': 1});
										console.log('LocalWords > ServerWords');
									}
								}else if(localLevel > serverLevel){
									isChange = true;
									params({'changeDataLocalMore': 1});
								}
							}

						}catch(er){}

						if(isChange){
							console.log('CHANGE DATA TO LOCAL');
							dataNotChanged = false;
							params({'changeDataToLocal': 1});
							PLAYESTATE.allDoneWords = allDoneWords;
						}
					}

					if(lastPlatformType !== platformType) dataNotChanged = true;
					console.log(lastPlatformType, platformType);

					if(dataNotChanged){
						console.log("GET SERVER DATA");
						allDoneWords = newData;
						PLAYESTATE.allDoneWords = newData;

						recentState = JSON.stringify(PLAYESTATE);
						setToStorage('allDoneWords', allDoneWords);
					}
				}
				if(ysdk.player.has('locationDoneWords')){
					let locationData = JSON.parse(ysdk.player.get('locationDoneWords'));
					let serverWords = fixDoneWords(decompressLocationData(locationData), true);
					let serverWordsAmount = getAmountLocationWords(serverWords);
					let localWordsAmount = getAmountLocationWords(locationDoneWords);

					if(serverWordsAmount > localWordsAmount){
						PLAYESTATE.locationDoneWords = 	serverWords;
						locationDoneWords = PLAYESTATE.locationDoneWords;
					}else{
						PLAYESTATE.locationDoneWords = 	locationDoneWords;
					}

					PLAYESTATE.locationDoneWords = serverWords;
					locationDoneWords = PLAYESTATE.locationDoneWords;
				}else{
					PLAYESTATE.locationDoneWords = locationDoneWords;
				}

				let dataTips = ysdk.player.get('tips');
				console.log('dataTips: ', dataTips);
				if (Number.isInteger(dataTips)) {
					tips = dataTips;
					// if(dataTips > tips){
					// 	tips = dataTips;
					// }
				}else{
					tips = 15;
				}
				update();
			}else{
				update();
			}
		});

		ysdk.player.fetchFields();
	}
	
}
let GP;
let TIPS = 0;
let allTips = [10,50,100,250,500];
let allOpenedLocations = [];

function testPurchaseForLocation(id){
	let newId = id.replace('location_', '');
	allOpenedLocations.push(newId);
	document.querySelector('.levels').dispatchEvent(new CustomEvent("switchOpenLocations"));
}

function consumePurchase(purchase) {
	console.log('purch: ', purchase);
	if (purchase.productID === 'cart_item2') TIPS = allTips[0];
	if (purchase.productID === 'cart_item3') TIPS = allTips[1];
	if (purchase.productID === 'cart_item4') TIPS = allTips[2];
	if (purchase.productID === 'cart_item5') TIPS = allTips[3];

	if (purchase.productID === 'cart_item6') {
		console.log('Отключена реклама');
		params({'disabledAds': 1});
		document.querySelector('.levels').dispatchEvent(new CustomEvent("disableAds"));
	}else if(purchase.productID.indexOf('location_') !== -1){
		testPurchaseForLocation(purchase.productID);
	}else{
		document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
		payments.consumePurchase(purchase.purchaseToken);
	}
}
//const itemsPrices = [20, 89, 149, 299, 499];
//const itemsPrices = [14, 59, 109, 209, 249]];
const itemsPrices = [20, 89, 149, 299, 349, 19];
let itemsPricesVK = [3, 13, 21, 42, 19];
let itemsPricesOK = [20, 89, 149, 299, 149];
let purchaseItemGP;
let buyItem;
function buyTips(purchaseItem) {
	if(process.env.PLATFORM === 'yandex'){
		if(payments && playerGame){
			payments.purchase(purchaseItem).then(purchase => {
				if(purchase.productID === purchaseItem){
					if(purchase.productID === 'cart_item2') TIPS = allTips[0];
					if(purchase.productID === 'cart_item3') TIPS = allTips[1];
					if(purchase.productID === 'cart_item4') TIPS = allTips[2];
					if(purchase.productID === 'cart_item5') TIPS = allTips[3];
					params({'buyItem': purchaseItem});
					if(purchase.productID === 'cart_item6'){
						document.querySelector('.levels').dispatchEvent(new CustomEvent("disableAds"));
					}else if(purchase.productID.indexOf('location_') !== -1){
						testPurchaseForLocation(purchase.productID);
					}else{
						payments.consumePurchase(purchase.purchaseToken);
						document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
					}


					// getBusinessEvent(itemsPrices[item-2], 'tip' + item);
				}
			}).catch((e)=>{
				console.log("PAYMENTS ERROR: " + e);
			});
		}else{
			console.log('open auth');
			YSDK.auth.openAuthDialog().then(() => {
				// Игрок успешно авторизован, теперь объект Player будет инициализирован.
				console.log('успешно авторизован');
				initPlayer(YSDK);
			}).catch((ignored) => {// Игрок не авторизован.
			});
		}
	}else if(process.env.PLATFORM === 'gp'){
		buyItem = purchaseItem;
		if(GP.payments.isAvailable){
			if(purchaseItem === 'cart_item6'){
				GP.payments.subscribe({ tag: 'cart_item6' });
			}else{
				GP.payments.purchase({ tag: purchaseItem })
			}
			purchaseItemGP = purchaseItem;


		}else{
			GP.player.login();
		}
	
	}
	
}







function testStar(doneWordsLength, allWordsLength) {
	if(doneWordsLength >= allWordsLength) return 3;
	let percent = Math.floor(doneWordsLength / allWordsLength * 100);
	if(percent >= 66) return 2;
	if(percent >= 33) return 1;
	return 0;
}
let wordsNumbers = ['2', '3', '4'];


function getRightWord(len){
	len = Number(String(len).slice(-2));
	let str = String(len);
	let last = str[str.length-1];
	if(len >= 10 && len <= 20) return 'слов';
	else if(last === '1') return 'слово'
	else if( wordsNumbers.includes(last) ) return 'слова'
	return 'слов';
}
function howManyWordsToStar(doneWordsLength, allWordsLength) {
	let allPercents = [Math.ceil(allWordsLength/3), Math.ceil(allWordsLength/3*2), allWordsLength];
	for(let i = 0; i < allPercents.length; i++){
		if(doneWordsLength < allPercents[i]){
			let amount = allPercents[i] - doneWordsLength;
			return [amount, getRightWord(amount)];
		}
	}
}
const NewAudioContext = (function() {

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.audioContext = new window.AudioContext();
	} catch (e) {
		console.log("No Web Audio API support");
	}
	/*
     * WebAudioAPISoundManager Constructor
     */
	var WebAudioAPISoundManager = function (context) {
		this.context = context;
		this.bufferList = {};
		this.playingSounds = {};
	};

	/*
     * WebAudioAPISoundManager Prototype
     */
	WebAudioAPISoundManager.prototype = {
		addSound: function (url) {
			// Load buffer asynchronously
			var request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.responseType = "arraybuffer";

			var self = this;

			request.onload = function () {
				// Asynchronously decode the audio file data in request.response
				self.context.decodeAudioData(
					request.response,

					function (buffer) {
						if (!buffer) {
							console.log('error decoding file data: ' + url);
							return;
						}
						self.bufferList[url] = buffer;
					});
			};

			request.onerror = function () {
				console.log('BufferLoader: XHR error');
			};

			request.send();
		},
		stopSoundWithUrl: function(url) {
			if(this.playingSounds.hasOwnProperty(url)){
				for(var i in this.playingSounds[url]){
					if(this.playingSounds[url].hasOwnProperty(i)) {
						this.playingSounds[url][i].stop(0);
					}
				}
			}
		}
	};

	/*
     * WebAudioAPISound Constructor
     */
	var WebAudioAPISound = function (url, options) {
		this.settings = {
			loop: false,
			volume: 0.3
		};

		for(var i in options){
			if(options.hasOwnProperty(i)) {
				this.settings[i] = options[i];
			}
		}
		this.url = url;
		this.volume = 0.3;
		window.webAudioAPISoundManager = window.webAudioAPISoundManager || new WebAudioAPISoundManager(window.audioContext);
		this.manager = window.webAudioAPISoundManager;
		this.manager.addSound(this.url);
		// this.buffer = this.manager.bufferList[this.url];
	};

	/*
     * WebAudioAPISound Prototype
     */
	WebAudioAPISound.prototype = {
		play: function () {
			var buffer = this.manager.bufferList[this.url];
			//Only play if it loaded yet
			if (typeof buffer !== "undefined") {
				var source = this.makeSource(buffer);
				source.loop = this.settings.loop;
				source.start(0);

				this.manager.playingSounds[this.url] = [];
				this.manager.playingSounds[this.url].push(source);
				return true;
			}
			return false;
		},
		stop: function () {
			console.log('stopSound');
			this.manager.stopSoundWithUrl(this.url);
		},
		getVolume: function () {
			return this.translateVolume(this.volume, true);
		},
		//Expect to receive in range 0-100
		setVolume: function (volume) {
			this.volume = this.translateVolume(volume);
		},
		translateVolume: function(volume, inverse){
			return inverse ? volume * 100 : volume / 100;
		},
		makeSource: function (buffer) {
			var source = this.manager.context.createBufferSource();
			var gainNode = this.manager.context.createGain();
			source.connect(gainNode);
			gainNode.gain.value = this.volume;
			source.buffer = buffer;
			// source.connect(gainNode);
			gainNode.connect(this.manager.context.destination);
			return source;
		}
	};

	return WebAudioAPISound;
})();

let wrongWordSound = new NewAudioContext('word-was3.mp3');
wrongWordSound.setVolume(10);
let wrongWordSound2 = new NewAudioContext('wrong-word2.mp3');
let wordWasSound = new NewAudioContext('word-was.mp3');
wordWasSound.setVolume(20);
let doneWordSound = new NewAudioContext('done-word.mp3');
let doneWordSound2 = new NewAudioContext('done-word2.mp3');
let starVolume = new NewAudioContext('star.mp3');
// let newLevel = new NewAudioContext('new-level');
let clickSound = new NewAudioContext('click.mp3');
let clickSound2 = new NewAudioContext('click2.mp3');
let musicSound;
function switchOnNewYearMusic(){
	if(!musicSound){
		musicSound = new NewAudioContext('music.mp3', {loop: true});
		musicSound.setVolume(10);
	}
}
// let exitLevelSound = new NewAudioContext('exitLevel');
function switchOnMainMusic(){
	try{
		window.audioContext.resume();
	}catch(e){}
}
function switchOffMainMusic(){
	try{
		window.audioContext.suspend();
	}catch(e){}
}
window.addEventListener("visibilitychange", () => {
	try{
		if (document.visibilityState === "visible" && !musicStoppedByAdv) {
			switchOnMainMusic()
		}else{
			switchOffMainMusic();
		}
		if (document.querySelector('.levels')) {
			document.querySelector('.levels').dispatchEvent(new CustomEvent("switchPause"));
		}
	}catch(e){console.log(e)}

});
let musicStarted = false;
window.onclick = function(){
	if(!musicStarted && isMusic){
		console.log('on click')
		switchOnNewYearMusic();
		musicStarted = musicSound.play();
		if(musicStarted){
			if (document.querySelector('.levels')) {
				document.querySelector('.levels').dispatchEvent(new CustomEvent("switchOnMusic"));
			}
		}

	}
}

const lettersMap = {
	'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь'
};

function doFirstLetterBig(str) {
	return str[0].toUpperCase() + str.slice(1);
}

function doFirstLetterSmall(str) {
	return str[0].toLowerCase() + str.slice(1);
}

function cantFindDesc() {
	console.log('cant find');
	try{
		if(notRussianGame){
			document.querySelector('.word-definition').innerHTML = 'Unfortunately, we couldn\'t find a definition. Try again later.'
		}else{
			document.querySelector('.word-definition').innerHTML = 'К сожалению, нам не удалось загрузить определение. Попробуйте позже.'
		}

	}catch(ignored){}
}
function getDefaultDesc() {
	try{
		if(notRussianGame){
			document.querySelector('.word-definition').innerHTML = 'Definition - loading...';
		}else{
			document.querySelector('.word-definition').innerHTML = 'Определение слова - загрузка...';
		}
		document.getElementById('definitionIframe').src = '';
	}catch(ignored){}
}
function addHTMLToDesc(html){
	try{
		document.querySelector('.word-definition').innerHTML = html.replace(/\u0301/g, "");
	}catch(ignored){}
}

function getEngDesc(word){
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
	const xhr = new XMLHttpRequest();


	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			let content = this.responseText;
			let str = '';
			let numDef = 1;
			try{
				content = JSON.parse(content);
				console.log(content);
				if(!(content.title === "No Definitions Found")){
					console.log('def f');
					for(let i = 0; i < content.length; i++){

						let means = content[i].meanings;
						console.log(means);
						for(let q = 0; q < means.length; q++){
							console.log(means[q]);
							if(means[q].partOfSpeech === "noun"){
								for(let z = 0; z < means[q].definitions.length; z++){
									str += numDef + ') ' +  means[q].definitions[z].definition + ' ';
									numDef++;
								}
							}
						}
					}
				}
				if(str){
					addHTMLToDesc(doFirstLetterBig(word) + ' — ' + str);
				}else{
					cantFindDesc();
				}


			}catch(e){cantFindDesc();}
		}
	});


	xhr.open("GET", url);
	xhr.send();

}

let dictWordsToReplace = {
	'теша': 'тёша',
	'приемка': 'приёмка',
	'еж': 'ёж',
	'осел': 'осёл',
	'орел': 'орёл',
	'клев': 'клёв',
	'расклев': 'расклёв',
	'поденка': 'подёнка',
	'недопек': 'недопёк',
	'шепот': 'шёпот',
	'котел': 'котёл',
	'отек': 'отёк',
	'лен': 'лён',
	'лет': 'лёт',
	'отел': 'отёл',
	'корье': 'корьё',
	'тигренок': 'тигрёнок',
	'тес': 'тёс',
	'филер': 'филёр',
	'флер': 'флёр',
	'смолье': 'смольё',
	'налет': 'налёт',
	'ворье': 'ворьё',
	'стежка': 'стёжка',
	'копер': 'копёр',
	'cчес': 'счёс',
	'расчес': 'расчёс',
	'тенета': 'тенёта',
	'затес': 'затёс',
	'елка': 'ёлка',
	'валер': 'валёр',
	'саек': 'саёк',
	'помет': 'помёт',
	'огневка': 'огнёвка'
}


	function getWordDesc(word) {
		console.log('getWordDesc --- ', word);
		// if(notRussianGame) return getEngDesc(word);
		try{
			let defIframe = document.getElementById('definitionIframe');
			if(dictionary[word]){
				addHTMLToDesc(dictionaryRU[word]);
				defIframe.classList.add('closedIframe');
				return;
			}

			if(dictWordsToReplace[word]) word = dictWordsToReplace[word];

			defIframe.classList.remove('closedIframe');
			let wordDefinition = document.querySelector('.word-definition')
			defIframe.onload = function (e){
				wordDefinition.innerHTML = '';
			}
			if(notRussianGame){
				wordDefinition.innerHTML = 'Definition - loading...';
				defIframe.src = 'https://en.wiktionary.org/wiki/' + word + '#Noun';
			}else{
				wordDefinition.innerHTML = 'Определение слова - загрузка...';
				defIframe.src = 'https://ru.wiktionary.org/wiki/' + word + '#Значение';
			}
		}catch(e){
			console.log(e);
		}
	}

function params(data) {
	try{
		// eslint-disable-next-line no-undef
		ym(57682372, 'params', data);
		// eslint-disable-next-line no-empty
	}catch(ignored){}
}
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iOS){
	document.documentElement.addEventListener('gesturestart', function (event) {
		event.preventDefault();
	}, false);
}


function deletePreDownload(){
	if (document.querySelector(".pre-download")) {
		document.querySelector(".pre-download").remove()
	}
	if(GP) GP.gameStart();
	params({'gameOpened': 1});
	try{
		let secondTimeOpen = new Date();
		let time = Math.floor((secondTimeOpen - firstTimeOpen)/1000);
		let time2 = Math.floor((secondTimeOpen - openTime)/1000);
		let time3 = Math.floor((secondTimeOpen - openTimeAfterSdk)/1000);
		params({'newGameOpenedTime': time});
		params({'newFullGameOpenedTime': time2});
		params({'openedTimeAfterSdk': time3});
		YSDK.features.LoadingAPI?.ready();
	}catch(e){}

}

let cloudPhrases = [
	'Добро пожаловать в игру <span class="cloudHint__mainText">"Слова из слова"</span>! Составляйте слова, чтобы проходить уровни.',
	'Нажимайте на <span class="cloudHint__mainText">буквы снизу</span>, чтобы составить слово!',
	'Нажмите на <span class="cloudHint__mainText">галочку</span>, чтобы отправить слово!',
	'Поздравляем! Ваше <span class="cloudHint__mainText">первое слово</span> уже на уровне. Давайте попробуем ещё!',
	'Игра принимает только <span class="cloudHint__mainText">нарицательные существительные</span> в единственном числе. Введём ещё слово!',
	'Нажмите на слово, чтобы узнать его <span class="cloudHint__mainText">значение</span>.',
	'Если закончились идеи, используйте <span class="cloudHint__mainText">подсказку</span>. На первом уровне подсказки бесконечны.',
	'Для перехода на следующий уровень заработайте хотя бы 1 <span class="cloudHint__mainText">звезду</span>.',
	'Ура! Вы <span class="cloudHint__mainText">успешно</span> закончили обучение. Желаем Вам удачи в прохождении игры!',
];


let infoAboutBackgrounds = 'Перейдите в меню, нажав на домик, чтобы выбрать <span class="cloudHint__mainText">цветовое оформление</span> в настройках.';
let infoAboutEletter = 'По техническим причинам буква <br><span class="cloudHint__mainText">Е приравнивается к Ё</span>. Учитывайте это при создании слов. Удачи!';
let infoAboutLocation = 'В игре есть <br><span class="cloudHint__mainText">тематические локации</span><br> Найдите их в меню, нажав на значок книжки.';
let infoAboutEndFirstLevel = 'Вы получили <span class="cloudHint__mainText">первую звезду</span> и теперь можете перейти на следующий уровень!';

let lvl5Phrase = 'Этот уровень особенно сложен, дарим вам <span class="cloudHint__mainText">10 дополнительных подсказок</span>. Удачной игры!';


function switchToEnglishVersion(){
	wordsFromWords = wordsFromWordsEN;
	allWords = allWordsEN;
	notRussianGame = true;
	let allDoneWordsEN = getFromStorage('allDoneWordsEN');
	let tipsEN = getFromStorage('tipsEN');

	infoAboutEndFirstLevel = 'You have received <span class="cloudHint__mainText">the first star</span> and now you can go to the next level!';
	cloudPhrases = [
		'Welcome to the game <span class="cloudHint__mainText">"Words from Words"</span>! Compose words to complete the levels.',
		'Click on the <span class="cloudHint__mainText">letters at the bottom</span> to compose a word!',
		'Click on the <span class="cloudHint__mainText">checkmark</span> to send the word!',
		'Congratulations! Your <span class="cloudHint__mainText">first word</span> is already at the level. Let\'s try again!',
		'The game accepts only <span class="cloudHint__mainText">common singular nouns</span>. Let\'s introduce another word!',
		'Click on a word to find out its <span class="cloudHint__mainText">meaning</span>.',
		'If you run out of ideas, use the <span class="cloudHint__mainText">hint</span>. On the first level the hints are endless.',
		'To move to the next level earn at least 1 <span class="cloudHint__mainText">star</span>.',
		'Congratulations! You <span class="cloudHint__mainText">have successfully</span> completed your training. We wish you good luck in completing the game!',
	];

	if(allDoneWordsEN){
		allDoneWords = fixDoneWords(JSON.parse(allDoneWordsEN));
		tipsEN = Number(tipsEN);
		if(tipsEN) tips = tipsEN;
		isRules = false;

		setLoc();
	}
}


let cloudPayloadPhrases = [
	'Добро пожаловать в игру <span class="cloudHint__mainText">"Слова из слова"</span>! Составляйте слова, чтобы проходить уровни.',
	'Нажимайте на <span class="cloudHint__mainText">буквы снизу</span>, чтобы составить слово, а затем на <span class="cloudHint__mainText">галочку</span>, чтобы его отправить!',
	'Составлять можно только <span class="cloudHint__mainText">нарицательные существительные в единственном числе</span>',
	'<span class="cloudHint__mainText">Удачной игры!</span>'
];
let cloudPayloadPhrases2 = [
	'Нажимайте на слова, чтобы узнать их <span class="cloudHint__mainText">значение</span>.',
	'Перейдите в меню, нажав на домик, чтобы выбрать <span class="cloudHint__mainText">цветовое оформление</span> в настройках.',
	'Также в игре есть <br><span class="cloudHint__mainText">тематические локации</span><br> Найдите их в меню, нажав на значок книжки.',
];



let tutorialStep = 0;
let isShowTutorial = true;
let bgLvlsOpen = [4, 14, 24];
let translatedLocationsNames = {
	newYear: 'Новогоднее приключение',
	magicTales: 'Волшебство <br> сказок',
	animals: 'Животные',
	eightMarch: 'Восьмое марта',
	fbv: 'Фрукты, ягоды и овощи',
	birds: 'Птицы',
	cinema: 'Кино и мультфильмы',
	event: 'Новогодний турнир',
	house: 'Дом, милый дом',
	farm: 'Моя деревня',
	halloween: 'Хэллоуин',
	valentines: 'День Валентина',
	games: 'День Видеоигр',
	writers: 'Знаменитые писатели',
	medicine: 'Медицина',
	egypt: 'Египет',
	againSchool: 'Снова в школу'
}

let defaultLocations = ['house', 'writers', 'medicine'];

// function getBanner(){
// 	try{
// 		if(window.innerHeight >= 650 && window.innerWidth > window.innerHeight){
// 			window.yaContextCb.push(()=>{
// 				Ya.Context.AdvManager.render({
// 					renderTo: 'yandex_rtb_R-A-518275-25',
// 					blockId: 'R-A-518275-25'
// 				})
// 			});
// 			params({'getBanner': 1});
// 		}
// 	}catch(e){
// 		console.log(e);
// 	}
// }
// let lastColor = 0;
// let randColors = ['#4598F9', '#F8C617', '#ED4A4A', '#3ee7f1', '#BE6EFD', '#ff6720', '#ff61ec', '#94eb08', '#3fb32a', '#C21332'];
// let arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
// let randArrColors = {};
// for(let i = 0; i < arr_ru.length; i++){
// 	randArrColors[arr_ru[i]] = randColors[lastColor];
// 	lastColor++;
// 	if(lastColor === randColors.length) lastColor = 0;
// }

function addScrollingToDesktop(isBottomBanner){
	try{
		let mouseLeft = 0;
		function movePage(e) {
			try{
				let scrolled = document.getElementById('app').scrollLeft;
				if(isBottomBanner){
					scrolled = document.querySelector('.container-lbInGame').scrollLeft;
				}
				let newRes = e.clientX;
				if(newRes > mouseLeft){
					scrolled -= (newRes-mouseLeft)*1.5;
				}else{
					scrolled += (mouseLeft-newRes)*1.5;
				}
				mouseLeft = newRes;
				if(isBottomBanner){
					document.querySelector('.container-lbInGame').scrollTo({
						left: scrolled
					});
				}else{
					document.getElementById('app').scrollTo({
						left: scrolled
					});
				}

			}catch(e){}
		}
		function onMouseDown(e){
			// console.log('down');
			mouseLeft = e.clientX;
			document.body.addEventListener('mousemove', movePage);
		}
		function onMouseUp(){
			document.body.removeEventListener('mousemove', movePage);
		}
		if(isBottomBanner){
			document.querySelector('.container-lbInGame').onmousedown = onMouseDown;
		}else{
			document.querySelector('.location').onmousedown = onMouseDown;
		}
		document.body.onmouseup = onMouseUp;

	}catch(e){console.log(e)}
}

//Свайп
function addSwipeTo(funcSwipeLeft, funcSwipeRight, isMenu){
	try{
		if(isMenu){
			document.querySelector('.levels__property').addEventListener('touchstart', handleTouchStart, false);
			document.querySelector('.levels__property').addEventListener('touchmove', handleTouchMove, false);
		}else{
			document.querySelector('.action-block__done-word').addEventListener('touchstart', handleTouchStart, false);
			document.querySelector('.action-block__done-word').addEventListener('touchmove', handleTouchMove, false);
		}

		let xDown = null;
		let yDown = null;

		function getTouches(evt) {
			return evt.touches || evt.originalEvent.touches;
		}
		function handleTouchStart(evt) {
			const firstTouch = getTouches(evt)[0];
			xDown = firstTouch.clientX;
			yDown = firstTouch.clientY;
		}
		function handleTouchMove(evt) {
			if ( ! xDown || ! yDown ) {
				return;
			}

			let xUp = evt.touches[0].clientX;
			let yUp = evt.touches[0].clientY;

			let xDiff = xDown - xUp;
			let yDiff = yDown - yUp;

			if ( Math.abs( xDiff ) > (Math.abs( yDiff )) ) {
				if(isMenu){
					if ( xDiff > 0 ) {
						funcSwipeLeft()
					} else {
						funcSwipeRight();
					}
				}else{
					funcSwipeLeft();
				}

			}

			xDown = null;
			yDown = null;
		}
	}catch(e){
		console.log(e);
	}

}

let showNextPayloadTutorial = false;

function goToUserInLb(){
	setTimeout(()=>{
		try{
			addScrollingToDesktop(true);
			let scrollEl = document.querySelector('.leaderBoardInfo_mine');
			scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
		}catch(ignored){}
	}, 200);
}

let lbWasShowed = false;

function testWordsInWord(word, inWord) {
	if (word.length > inWord || word === inWord) return false;
	let letrs = inWord.split('');
	for (let j = 0; j < word.length; j++) {
		if (!letrs.includes(word[j])) return false;
		else {
			letrs.splice(letrs.indexOf(word[j]), 1);
		}
	}
	return true;
}
function getWordsFromWords(word){
	let allWords = [];
	for(let i = 0; i < wordsList.length; i++){
		if(testWordsInWord(wordsList[i], word) && !allWords.includes(wordsList[i])){
			allWords.push(wordsList[i]);
		}
	}
	return allWords;
}
let eventScore = 0;
let eventWord = 0;
let skipNewTutorial = false;
function returnDate(){
	const today = new Date();
	const day = today.getUTCDate();
	const hours = today.getUTCHours();
	const month = today.getUTCMonth();
	const year = today.getUTCFullYear();
	return {
		day: day,
		hours: hours,
		month: month,
		year: year
	}
}
function testShowResult(){
	const date = returnDate();
	return (date.year === 2023 && date.day > 10) ||
		(date.year === 2023 && date.day === 10 &&
			date.hours >= 9);
}
function testSendResult(){
	const date = returnDate();
	return (date.year === 2023 && date.day > 8) ||
		(date.year === 2023 && date.day === 8
			&& date.hours >= 9);
}
function testFastSendResult(){
	const date = returnDate();
	return date.year === 2023 && date.day === 8
			&& date.hours >= 8;
}
function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}
const proms = ["ATE63WM8","NT31XTXF","44SGBV2X","KGEV0X5Y","B5Z2HX95","3UWAHFUU","PYS6N4KU","P7Z8E93Y","9Z41K2ZE","FEKBGKB3","6E7PBMNA","C98DVGXH","DFDBB3XZ","PCEYUPEN","6SZW2BKF","CSDDUNMW","S136TG2R","ZF4U3V9V","EAUVA9RX","C2945Z6M","UM5UR75D","KS57D7DD","Z09T3VD2","T0XER5NG","MT247E84","GBNCA3G8","0GE9XVY9","9EA6PP5P","TF60SE8H","DEDPWS11","TE8HCYW7","A9R20GZB","8RY1XT40","VCD4NZPN","7MZ13DK4","4EXKKB2E","851GAG5X","EXGYCG21","MZ28AU0D","8FPNC6X9","U7FGFF50","DEAD4N3P","W7AAW146","ZK1M814H","7BZ8HXMU","KPTCK5NF","UMXRP80K","T839V0G7","ZA2W5EWT","UTZDSFZH","EG5UCTFT","XRYE0MTH","TRV54XVP","MSHFPBHZ","A50BA6RA","9F5RW9AS","FNCNN0F5","EMWWYMHH","E4NVRM5S","AVTUETHU","U80MV38W","2523K216","VEAZRBN5","96UFUV23","W9SA7M5N","G840M1VV","V2R1K3NC","6045G36Y","M27ZU62V","2WDUEEP7","8H8A1FSB","1ZXP3YPG","DU5MM0UY","CZ8MUG2E","U753164R","61D2STVU","0RVD63NM","KZ7250SG","7WVKNKES","YVYYTDKB","KR7YSNYN","FWKS23K7","XPEN2PP1","3PT6S18R","1973C6W8","982HCRHK","5UTMVCCC","RD9F4NKC","PRYMA7VG","841W7X9R","54MUWVPN","4TUWAGKT","H26Y1NKC","CWE00W9K","ZDGKXN3Z","2V1C2R5S","H25TH5BG","4B7X07CE","648G3C54","TZMEZR52","VF45N4E4","9S1GR7BN","7N3SC21E","TT49UP2M","KMET1KVS","R4MMY6VX","2XCVDAPT","9RUX4878","1FW9ASAA","E4B0DGG2","SMA7EPHD","ERDFM73W","KCMNXS2E","KD1VA6S6","K8F60N0D","9C0ZF3N3","N1A7SRHA","B7G1T4XV","Y3RXHGBN","7HD20S6M","K3MN3339","TF2ZK03R","3ZFMBTYV","2WP1V99E","UT5NPHF2","0F217KHZ","2MTREV3F","B77W9CPS","ZGXCXT04","C3VMH7UB","ABW0XY4R","ZAK3PS7B","MHYHW97G","TT2T58M7","WS6K5EAK","15AUMTVE","8D74NN97","7RTEV2TR","W8HTYCHC","A4FZD5ZM","AEVTE6RZ","8RG1P3ZA","W0NG5CHM","Y5A7NF6V","CHXDHT5B","5G8PE70R","C6NF9YNU","XYW54XU8","KRW5H7XD","1VPZMADS","5VZF12WY","NEAPN03B","KWAKPTNR","7N9UYP1E","XT0H3D8G","A246YB4G","8KKS6DB4","T2TH4W2Y","MYZA8E0P","PCUKNY8T","281YD745","16NS81CG","CPDM0N8B","TYW7WV2K","V371YUG8","5REUPY33","C3EY5AX5","P3D3YTDC","S4BFGYDB","246EMYDC","FV6S70YH","HYK7SU9V","8V2WM6HD","HFM18WVB","ZM9KYM11","EDUTYKPK","3K4UX3SB","H9773ETG","7W0EV03K","UABCSK5B","X3Z7PW5C","ZWSB7U7H","FUFN9KMG","XPNVUA0G","2N8HPMUG","NTPM1SGN","4X2W7XRK","10DTYWCV","K5TNPVGE","WVE2VGSC","A08Y1D1W","X55MCDUZ","EVF6BUTU","SN3HB5TD","MSMSTGME","ZA4GFUU2","C13HFV4G","267F6UWN","VAMPA7GR","WR6TSXDB","SN3NGHFA","VGFGBB05","S35SSB5X","9RW1M4RN","FKZ1PH2U","6FFGWH2V","GR6MRHGB","6SYUR2ZY","AVGSBCAV","YUUXY35F","W4MA19N7","MZPHMVAH","Z06SC5ZV","EASYMTMX","Z172W5ZY","ZBY5WY66","A3DFPK05","TU4SE0RK","ASUKD943","NMD80T1K","DXZ69MCZ","ZFFG8W7E","CN1UKXC2","T87PZ8K9","CZ7974CT","FH6UUCDE","YT5RAR75","8WGG1WK1","16UDRANX","ZBNP82NF","DV4VTA2E","BU873K6C","A6H7FPHW","R0MD05U6","B0SHGM8W","G22T84HT","DGF5DPW7","TMS3P4FD","71VMZUTN","NAVK5RCB","YNZ68AHK","PZ8XX9ZZ","GZ16EEMG","RKFAVD9B","G74BB4NV","1PMF24ZA","K7357RAA","G4RY209N","FE66UCBE","1BWYNNUK","WEH9DVRH","M48MERS5","KRK4VWRX","S26D8EE4","F3930U2M","KHS90F3F","BTDZBH1B","XRT9NC1W","RXH12NBG","X694H6BD","VKM764UC","K6RB3XUV","970ACKU5","M975S5N2","6BB9VK2G","9HZCHPGB","2MX3ZGZY","1S3R8EYP","MXBKN2CS","BTSPAS4D","5K2VTD4D","3U8DSPE1","VNK7G3US","A946N0ZE","0RCW4SEH","SXFH7ARG","HFDY0WFR","P7P0ZE67","MUZWY13B","WS8YACN3","0KRHWP6D","9PB9SVMG","G3VB09KK","V4ZT5MBE","068SU6XT","1WM8CUU1","B8TWGMXF","C2ZCN74D","HAGV1RSB","36ZH00ZT","DD726DF1","SVWY7CHW","CFV0XVXU","WSBFGGRF","2EE9BZR6","4XSVDBKD","2YYX0B1X","Z6SYWHDU","BAU5FAEU","41WVDEPB"];
const mainUniq = ['TJgwFXC9SXvc50yCq60wLTPZTarJt+sv4EQbsvklCi0=', 'T7HKgy+MM2v3Mq/QlNV/eexk1t2rF5eH95WwBakhkz4=', '22Q/Ti+AwwqwDoeqcuBgh6k7I5p5JlQ4o0tA2RaQgeE=', 'Q9uFo/ZVB0/MVAfGeLihCwr6lRuG+ql/NL5LUA+QEaA=', 'jSmtoceGKNTqqSwYsyG1tndfZDolylcfDJAK0q6/8wo=', "nE3PFtmH3cU0QNdssumZBiQ2oOsiB71hun9Z9PWZ8cU="];
let isTextTyping = false;
let goodGames = ["ХОРОШАЯ РАБОТА!", "ОТЛИЧНАЯ ИГРА!", "ТЫ МОЛОДЕЦ!", "ВОСХИТИТЕЛЬНО!"];
let firstGetBanner = false;
function getOneRandStart(){
	return Math.floor(Math.random()*25)+1;
}

function scrollIntoViewX(container, element, options = {}) {
	try {

		if (!container || !element) return;
		const {behavior = 'auto', align = 'start'} = options;
		// --- MEASURE (только чтения) ---
		const cRect = container.getBoundingClientRect();
		const eRect = element.getBoundingClientRect();
		const cur = container.scrollLeft; // чтение
		const delta = eRect.left - cRect.left; // элемент относительно контейнера в вьюпорте

		// Базовая цель: текущий scrollLeft + сдвиг элемента относительно контейнера
		let target = cur + delta;

		// Выравнивание
		const gap = container.clientWidth - element.clientWidth; // чтения
		if (align === 'center') {
			target -= gap / 2;
		} else if (align === 'end') {
			target -= gap;
		} // 'start' — без доп. сдвига

		// Кламп
		const max = Math.max(0, container.scrollWidth - container.clientWidth); // чтения
		target = Math.max(0, Math.min(target, max));

		// --- WRITE (только запись) ---
		container.scrollTo({left: Math.round(target), behavior});

	} catch(e){}
}


let gameTimers = [10, 15, 30, 45, 60, 90, 120, 180]
const scamPlayers = ["CrDmsI8H1lUNdtNrTP5OTCyon5xqDXQyXgnbNu+I0Yg=", "wcBS53P0OgG+YzAXlszk1FtoBxTggB6FAKGKBT8TmZA=", "J1PDGz5DLu6shLCCBYpxZmNJWVPWEKx5ufZAI4X74zU=", "rrK3fAIMjW3tIGO2RWSS8dGyMSIwSGhWqA8FcIOsAb4=", "7LQfUSbZYLQ0fqg1s8hIKAA7hMnwEv7I2RGiPqtrUh8=", "oSuq1pgZxAgmIAqESjPn7XuUltVk1o4b7yUxxkGf+2E=", "x0+igey20wXshdwdDQCwW4DveAVwGvmzB9r0+GfPIZk=", "XUDWsVlVCCS6YrlA+EmbbPebuw7IXp1WlLsuZ+EXpaY=",
	"lRMomuvFGZ6I11rL92MOTrYRDSFFxL9ic0WVNRonUN8="]

function fixWordToNormal(word){
	return word.replace(repeatedWordSign, '');
}
let goodWords = ['Восхитительно!','Превосходно!','Отлично!','Замечательно!','Великолепно!','Потрясающе!','Идеально!','Чудесно!'];
let onRewardedAlreadyDone = false;
export default {
	name: 'App',
	components: {CrossVue, CrossComponent},
	data(){
		return {
			levels: true,
			content: false,
			lvl: 0,
			letters: [],
			selectedLetters: [],
			wordFromLetter: '',
			numOfLevels: allWords.length,
			location: loc,
			allLocations: allLocations,
			stars: allStars,
			nowWords: [],
			doneWords: [],
			tipCount: tips,
			isBadWord: false,
			rules: false,
			levelsAnim: false,
			shop: false,
			newWord: '',
			animWord: '',
			words: '',
			getStar: -1,
			animWordStart: '',
			isSounds: sounds,
			advShowNow: false,
			showAdvTip: false,
			isAdvShowed: false,
			isSettings: false,
			showGameAdv: false,
			isGameAdvShow: false,
			wordWasIndex: -1,
			canShowAdv: false,
			showWordDesc: false,
			gameUpdate: isGameUpdate,
			showLastLevelInfo: showUpdate,
			wasUpdate: showUpdate,
			isLeaderBoard: false,
			leaderBoard: false,
			playerRait: false,
			subscribeCompleted: false,
			purchaseCompleted: false,
			notRussian: notRussianGame,
			gameLastLevel: lastLevel,
			isTutorial: false,
			cloudHint: false,
			cloudsPhrase: cloudPhrases[0],
			tutorialSelected: -1,
			selectSend: false,
			selectMainWord: false,
			selectTip: false,
			canShowSkip: false,
			chosenBg: 0,
			bgLvlsOpen: bgLvlsOpen,
			chosenBgRight: chosenBackground,
			openNewBg: false,
			bgShowen: false,
			lastSounds: isLastSounds,
			showBigWordWas: false,
			notShowLetters: [],
			levelClosedShow: false,
			closedLevel: 1,
			showLocations: false,
			showGameLocation: false,
			gameLocation: 'newYear',
			locationGame: false,
			locationStars: [],
			wordSwing: '',
			allLocationsNames: ['againSchool', 'egypt', 'medicine', 'games','valentines','halloween', 'writers', 'farm', 'cinema', 'birds', 'house', 'fbv', 'eightMarch', 'animals', 'magicTales',  'newYear'],
			blockedLocations: ['egypt'],
			showInfoAboutPageNumber: false,
			showAdvError: false,
			showInfoAboutPortrait: false,
			advTimer: 0,
			showWhyBadWord: false,
			textWhyBadWord: '',
			payloadTutorial: false,
			lbInGame: false,
			showInfoAboutStars: false,
			pageNumVal: 0,
			verticalPayload: false,
			isPayloadInfo: false,
			lvlsOnPage: lvlsOnPage,
			isCreateGameWindow: false,
			gameWord: '',
			isMyGame: false,
			wordsThisLevel: [],
			gameWordMistake: false,
			savedMyGame: savedMyGame,
			levelStars: 0,
			isInfoAboutCreateGame: false,
			isInfoAboutGameForTwo: false,
			howManyTips: 10,
			eventLocation: false,
			eventLocationWordsAMount: 500,
			isInfoAboutTips: false,
			isEventResult: false,
			eventResult: 0,
			notShowResult: false,
			isResultLoading: false,
			playerInfo: {
				"player": {
					"uniqueID": 'Здесь будет uniqueID',
				},
				rank: 1
			},
			isInfoAboutClosedEvent: false,
			buttonPromoText: 'Скопировать промокод',
			isPlayerAuth: isPlayerAuth,
			selectedOption: 'None',
			notShowAds: false,
			endType: false,
			goodGameText: goodGames[Math.floor(Math.random() * goodGames.length)],
			isEndGame: false,
			endGameIcon: 'endGame__icon1',
			crosspromo: false,
			timeToShowNextAdv: 3,
			isShowTimeToShowNextAdv: false,
			notShowAdvPause: false,
			randomStars: [],
			randomLevelStars: [],
			isMusic: false,
			showBgChanger: false,
			gameWindowForTwo: false,
			isGameForTwo: false,
			gameSelectedTime: 2,
			timeOptions: [
				{ text: '00:10', value: 0 },
				{ text: '00:15', value: 1 },
				{ text: '00:30', value: 2 },
				{ text: '00:45', value: 3 },
				{ text: '01:00', value: 4 },
				{ text: '01:30', value: 5 },
				{ text: '02:00', value: 6 },
				{ text: '03:00', value: 7 },
			],
			gameSelectedSize: 8,
			sizeOptions: [
				{ text: '5 букв', value: 5 },
				{ text: '6 букв', value: 6 },
				{ text: '7 букв', value: 7 },
				{ text: '8 букв', value: 8 },
				{ text: '9 букв', value: 9 },
				{ text: '10 букв', value: 10 },
				{ text: '11 букв', value: 11 },
				{ text: '12 букв', value: 12 },
			],
			gameForTwoState: savedGameForTwo,
			gameTimer: 180,
			gamePaused: false,
			sendWordForbidden: false,
			isGameTimeout: false,
			gameForTwoResult: 0,
			allGamesInfo: [],
			crossPromoObj: undefined,
			fixedWord: '',
			showCompliment: false,
			complimentWord: 'Восхитительно!',
			platformBuild: process.env.PLATFORM
		}
	},
	computed:{
		gameForTwoResultText(){
			if(this.gameForTwoResult === 0) return 'Игрок #1 победил!'
			if(this.gameForTwoResult === 1) return 'Игрок #2 победил!'
			if(this.gameForTwoResult === 2) return 'Ура! Ничья!'
			if(this.gameForTwoResult === 3) return 'Игрок #1 выбыл!'
			return 'Игрок #2 выбыл!'
		},
		allStars(){
			return this.stars.reduce((acc, el)=> acc+ el, 0);
		},
		locationAllStars(){
			return this.locationStars.reduce((acc, el)=> acc+ el, 0);
		},
		showNextLoc(){
			return (this.gameLastLevel+1) >= (this.location + 1) * lvlsOnPage;
		},
		cantShowBg(){
			return this.chosenBg > 0 && this.isCloseLevelShow(bgLvlsOpen[this.chosenBg-1]+1);
		},
		moreGuessedWords(){
			if(this.doneWords.length >= this.nowWords.length) {
				return this.notRussian ? 'Level completed!' : 'Уровень пройден!';
			}
			let wordsAmount = howManyWordsToStar(this.doneWords.length, this.nowWords.length);
			if(this.notRussian) return 'There are ' + wordsAmount[0] + ' words left until the next star';
			return 'До следующей звезды осталось ' + wordsAmount[0] + ' ' + wordsAmount[1];
		},
		lastLocationLevel(){
			for(let i = 0; i < this.locationStars.length; i++){
				if(this.locationStars[i] === 0 && this.locationStars[i+1] === 0){
					return i+1;
				}
			}
			return 20;
		},
		advTimerTime(){
			let firstTime = 0;
			let addTime = this.advTimer;
			if(this.advTimer >= 60){
				firstTime = 1;
				addTime = addTime - 60;
			}
			if(addTime < 10)  addTime = '0' + addTime;
			return firstTime + ':' + addTime;
		},
		gameLastLocation(){
			return Math.ceil((this.gameLastLevel+1) / lvlsOnPage);
		},
		locationClassID(){
			if(defaultLocations.includes(this.gameLocation)) return 'default';
			return this.gameLocation;
		},
		gameTimerInText(){
			let mins = Math.floor(this.gameTimer / 60);
			let seconds = this.gameTimer - mins * 60;
			if(seconds < 10) seconds = '0' + seconds;
			return '0' + mins + ':' + seconds;
		},
		linkToGroup(){

			if(process.env.PLATFORM === 'yandex'){
				return 'https://vk.com/jaugr';
			}else if(process.env.PLATFORM === 'gp'){
				if(platformType === 'OK') return 'https://ok.ru/group/70000002237520';
				return 'https://vk.com/witgames';
			}

		}
	},
	methods:{
		getPlayerAvatar(player){
			if(process.env.PLATFORM === 'yandex'){
				return player.player.getAvatarSrc('medium');
			}else if(process.env.PLATFORM === 'gp'){
				return player.avatar;
			}
		},
		getPlayerName(player){
			if(process.env.PLATFORM === 'yandex'){
				return player.player.publicName ? player.player.publicName : 'Нет имени';
			}else if(process.env.PLATFORM === 'gp'){
				return player.name ? player.name : 'Игрок #' + player.id
			}
		},
		getPlayerRank(player){
			if(process.env.PLATFORM === 'yandex'){
				return player.rank;
			}else if(process.env.PLATFORM === 'gp'){
				return player.position;
			}
		},
		canShowLevel(level){
			return !!allWords[level];

		},
		switchPause(){
			if(this.isGameForTwo){
				this.gamePaused = true;
			}
		},
		toggleGamePause(){
			if(!this.isGameForTwo){
				this.gamePaused = false;
				return;
			}
			this.isGameTimeout = false;
			this.gamePaused = !this.gamePaused;
			if(!this.gamePaused){
				this.setTimerGameForTwo();
			}
		},
		getRandomWord(){
			let w;
			w = wordsList[Math.floor(Math.random() * wordsList.length)];
			if(this.gameWindowForTwo){
				while(w.length !== this.gameSelectedSize){
					w = wordsList[Math.floor(Math.random() * wordsList.length)];
				}
			}
			this.gameWord = w;
		},
		openGameWindowForTwo(){
			this.showLastLevelInfo = false;
			this.toggleIsCreateGameWindow(true);
		},
		toggleBgChanger(){
			this.chosenBg = this.chosenBgRight;
			this.showBgChanger = !this.showBgChanger;
		},
		switchOnMusic(){
			this.isMusic = true;
		},
		getRandomStars(isLevel){
			let randStars = [getOneRandStart()];
			let max = 61;
			if(isLevel) max = 3;
			for(let i = 1; i < max; i++){
				randStars[i] = getOneRandStart();
				if(randStars[i] === randStars[i-1]) i--;
			}
			if(isLevel){
				this.randomLevelStars = randStars;
			}else{
				this.randomStars = randStars;
			}

		},
		changeOrientation(){
			if(window.innerHeight > window.innerWidth){
				lvlsOnPage = 20;
				allLocations = Math.floor(allWords.length / lvlsOnPage);
				this.lvlsOnPage = lvlsOnPage;
				this.allLocations = allLocations;
				this.location = Math.floor(lastLevel / lvlsOnPage);
			}else{
				lvlsOnPage = 18;
				allLocations = Math.floor(allWords.length / lvlsOnPage);
				this.lvlsOnPage = lvlsOnPage;
				this.allLocations = allLocations;
				this.location = Math.floor(lastLevel / lvlsOnPage);
			}
		},
		getPromoResult(){
			this.eventResult = 1;
			this.isEventResult = true;
		},
		clickPromo(){
			params({'crossPromo': 1});
		},
		toggleCrossPromo(){
			this.crosspromo = !this.crosspromo;
		},
		sendSelectedData(){
			params({'questionBackground': this.selectedOption});
			this.showLastLevelInfo = false;
		},
		getEventPrize(){
			if(!gotEventBfGift){
				params({'getEventGift': this.eventResult});
				if(this.eventResult === 2){
					this.tipCount += 50;
				}else if(this.eventResult === 4){
					this.tipCount += 25;
				}

				// if(this.eventResult === 1){
				// 	this.tipCount += 100;
				// }else if(this.eventResult === 2){
				// 	this.tipCount += 75;
				// }else if(this.eventResult === 3){
				// 	this.tipCount += 50;
				// }else if(this.eventResult === 4){
				// 	this.tipCount += 35;
				// }

				setToStorage('tips', this.tipCount);
				PLAYERSTATS.tips = this.tipCount;
				setToStorage('gotEventBfGift', 'true');
				gotEventBfGift = true;
				saveAllData(true);
			}
		},
		getEndGame(){
			this.isEndGame = true;
			this.endGameIcon = 'endGame__icon' + (Math.floor(Math.random() * 8) + 1);
			this.goodGameText = goodGames[Math.floor(Math.random() * goodGames.length)];
		},
		scamTest(){
			try{
				if(scamPlayers.includes(playerGame._personalInfo.uniqueID)){
					return true;
				}
			}catch(e){
				return false;
			}
		},
		getEventResult(){
			let isResult = testShowResult();
			if(isResult){
				this.notShowResult = false;
				this.isResultLoading = true;
				try{
					let that = this;
					YSDK.getLeaderboards()
						.then(lb => {
							lb.getLeaderboardPlayerEntry('event')
								.then(player => {
									this.isResultLoading = false;
									that.playerInfo = player;
									this.eventResult = 0;
									if(player.rank <= 300){
										this.eventResult = 2;
									}
									let id = player.player.uniqueID;
									if(mainUniq.includes(id)){
										if(this.eventResult === 2){
											this.eventResult = 1;
										}else{
											this.eventResult = 3;
										}
									}

									if(this.eventResult === 0 && player.score !== 0){
										this.eventResult = 4;
									}
									// if(player.rank === 1 || player.rank === 0){
									// 	this.eventResult = 1;
									// }else if(player.rank <= 50){
									// 	this.eventResult = 2;
									// } else if(player.rank <= 500){
									// 	this.eventResult = 3;
									// }else if(player.score !== 0){
									// 	this.eventResult = 4;
									// }else{
									// 	this.eventResult = 0;
									// }
									this.getEventPrize();
								})
								.catch(e => {
									console.log(e);
									this.eventResult = 0;
								})
						}).catch(e => {
							console.log(e);
							this.eventResult = 0;
						});
				}catch(e){
					console.log(e);
				}
			}else{
				this.notShowResult = true;
			}

		},
		getPrize(){
			let prom = 'промокод на Яндекс Маркете на cкидку 200 ₽*, действует на один заказ пользователя при сумме заказа от 3000 рублей**';
			if(this.eventResult === 2){
				return prom
			}else if(this.eventResult === 1){
				return 'умная колонка "Яндекс Станция Лайт" и ' + prom;
			}else if(this.eventResult === 3){
				return 'умная колонка "Яндекс Станция Лайт"';
			}
			// if(this.playerInfo.rank === 1) return 'умная колонка «Яндекс Станция Мини»';
			// if(this.playerInfo.rank === 2) return 'промокод в Яндекс Маркет на 200 ₽';
			// if(this.playerInfo.rank === 3) return 'промокод в Яндекс Маркет на 200 ₽';
			// if(this.playerInfo.rank <= 50) return 'промокод в Яндекс Маркет на 200 ₽';
			// if(this.playerInfo.rank <= 500) return '50 Янов';
			// return '50 подсказок'
		},
		getPromoCode(){
			return proms[this.playerInfo.rank-1];
		},
		copyPromoCode(){
			copyToClipboard(this.getPromoCode());
			this.buttonPromoText = 'Скопировано';
		},
		copyPost(){
			copyToClipboard('jaugr-games@yandex.ru');
		},
		toggleInfoAboutClosedEvent(){
		this.isInfoAboutClosedEvent = !this.isInfoAboutClosedEvent;
		},
		toggleIsEventResult(){
			this.rules = false;
			this.isEventResult = !this.isEventResult;
			this.getEventResult();
			this.buttonPromoText = 'Скопировать промокод';
		},
		toggleIsInfoAboutTips(){
			this.isInfoAboutTips = !this.isInfoAboutTips;
		},
		getEventLocation(){
			this.openGameLocation('event');
			this.showLastLevelInfo = false;
		},
		openEventLocation(){
			this.eventLocation = true;
		},
		toggleIsInfoAboutCreateGame(){
			this.isInfoAboutCreateGame = !this.isInfoAboutCreateGame;
		},
		startTimerGameForTwo(){
			this.gameTimer = gameTimers[this.gameSelectedTime];
		},
		setTimerGameForTwo(){
			let interval = 1000; // ms
			let expected = Date.now() + interval;
			let step;
			step = () => {
				if(!this.isGameForTwo || this.gamePaused || this.sendWordForbidden) return;
				let dt = Date.now() - expected;
				this.gameTimer -= 1;
				if(this.gameTimer <= 0){
					this.isGameTimeout = true;
					if(this.gameForTwoState.firstPlayerMove){
						this.gameForTwoState.firstPlayer.missedMoves++;
					}else{
						this.gameForTwoState.secondPlayer.missedMoves++;
					}
					this.nextTurnGameForTwo();
					this.testForEndGameForTwo();

					return;
				}
				expected += interval;
				setTimeout(step, Math.max(0, interval - dt));
			}
			setTimeout(step, interval);
		},
		nextTurnGameForTwo(){
			this.gameForTwoState.firstPlayerMove = !this.gameForTwoState.firstPlayerMove;
			this.gamePaused = true;
			this.startTimerGameForTwo();
		},
		testForEndGameForTwo(){
			if(this.gameForTwoState.firstPlayer.missedMoves > 1
				|| this.gameForTwoState.secondPlayer.missedMoves > 1 ||
				this.doneWords.length >= this.nowWords.length){
				this.endGameForTwo();
			}
		},
		endGameForTwo(){
			this.gamePaused = false;
			let score1 = this.gameForTwoState.firstPlayer.words.reduce((acc, c)=>acc+c.length, 0);
			let score2 = this.gameForTwoState.secondPlayer.words.reduce((acc, c)=>acc+c.length, 0);
			if(score1 > score2){
				this.gameForTwoResult = 0;
			}else if(score1 < score2){
				this.gameForTwoResult = 1;
			}else{
				this.gameForTwoResult = 2;
			}
			if(this.gameForTwoState.firstPlayer.missedMoves > 1){
				this.gameForTwoResult = 3;
			}else if(this.gameForTwoState.secondPlayer.missedMoves > 1){
				this.gameForTwoResult = 4;
			}

			params({'endGameForTwo': 1});

			this.getEndGame();
		},
		createGameForTwo(isContinue){
			this.isGameForTwo = true;
			this.isGameTimeout = false;
			if(!isContinue){
				this.gameForTwoState = {
					word: this.gameWord,
					doneWords: this.doneWords,
					firstPlayer: {
						words: [],
						missedMoves: 0
					},
					secondPlayer: {
						words: [],
						missedMoves: 0
					},
					firstPlayerMove: true,
					gameSelectedTime: this.gameSelectedTime
				}
			}else{
				this.gameSelectedTime = this.gameForTwoState.gameSelectedTime;
			}
			this.startTimerGameForTwo();
			this.gamePaused = true;
			params({'startGameForTwo': 1});
		},
		startCreateGame(isContinue){
			if(isContinue){
				if(this.gameWindowForTwo){
					this.gameWord = this.gameForTwoState.word;
				}else{
					this.gameWord = this.savedMyGame.word;
				}
			}
			if(/^[а-яёА-ЯЁ]+$/.test(this.gameWord)
				&& this.gameWord.length > 4 && this.gameWord.length < 13){
				this.gameWord = this.gameWord.replace(/ё/g, 'е');
				this.gameWordMistake = false;
				this.isMyGame = true;
				this.isCreateGameWindow = false;
				this.closeAllBeforeStartLevel(false);
				this.gameWord = this.gameWord.toLowerCase();
				this.lvl = 99998;
				this.word = this.gameWord;
				this.doneWords = [];
				if(isContinue){
					if(this.gameWindowForTwo){
						this.doneWords = this.gameForTwoState.doneWords;
					}else{
						this.doneWords = this.savedMyGame.words;
					}
				}

				this.letters = this.word.split('');
				this.wordsThisLevel = getWordsFromWords(this.gameWord);
				this.nowWords = this.wordsThisLevel.slice().sort().sort((a, b)=>{
					if(a.length > b.length) return 1;
					if(a.length < b.length) return -1;
					return 0;
				});
				this.levelStars = testStar(this.doneWords.length, this.nowWords.length);
				this.findNotShowLetters();
				//Включаем игру на двоих
				if(this.gameWindowForTwo){
					this.createGameForTwo(isContinue);
				}
				this.gameWord = '';

			}else{
				this.gameWordMistake = true;
			}
		},
		toggleIsCreateGameWindow(isGameForTwo){
			this.isCreateGameWindow = !this.isCreateGameWindow;
			if(this.isCreateGameWindow){
				this.gameWindowForTwo = !!isGameForTwo;
				if(isGameForTwo){
					this.getRandomWord()
				}
				this.gameWordMistake = false;
				if(this.gameWindowForTwo){
					if(infoAboutGameForTwo < 2){
						this.isInfoAboutGameForTwo = true;
						this.isInfoAboutCreateGame = true;
						setToStorage('infoAboutGameForTwo', infoAboutGameForTwo + 1);
						infoAboutGameForTwo = 2;
					}
				}else if(infoAboutMyGame < 2){
					this.isInfoAboutGameForTwo = false;
					this.isInfoAboutCreateGame = true;
					setToStorage('infoAboutMyGame', infoAboutMyGame + 1);
					infoAboutMyGame = 2;
				}

			}else{
				this.gameWindowForTwo = false;
			}
		},
		startPayloadTutorial(){
			if(!isShowTutorial && !showNextPayloadTutorial) return;
			if(this.allStars > 0) return;
			console.log('start');
			this.payloadTutorial = true;
			tutorialStep = 0;
			this.startTutorial();
			this.isTutorial = false;
			if(showNextPayloadTutorial){
				cloudPayloadPhrases = cloudPayloadPhrases2;
				showNextPayloadTutorial = false;
				isShowTutorial = false;
			}else{
				showNextPayloadTutorial = true;
			}
			this.cloudsPhrase = cloudPayloadPhrases[0];


		},
		toggleShowWhyBadWord(){
			this.showWhyBadWord = !this.showWhyBadWord;
		},
		startRewardedTimer(){
			if(this.tipCount > 0) return;
			this.advTimer = 20;
			if(timeToShowAdv < this.advTimer) this.advTimer = timeToShowAdv;
			let timer;
			timer = setInterval(()=>{
				this.advTimer--;
				if(this.advTimer <= 0) clearInterval(timer);
			}, 1000)
		},
		toggleShowInfoAboutPortrait(){
			if(!this.showInfoAboutPortrait){
				if(portraitAdviceAmount){
					if(Number(portraitAdviceAmount) >= 1) return;
					portraitAdviceAmount++;
					setToStorage('portraitAdviceAmount', portraitAdviceAmount);
				}else{
					portraitAdviceAmount = 1;
					setToStorage('portraitAdviceAmount', '1');
				}
			}

			this.showInfoAboutPortrait = !this.showInfoAboutPortrait;

		},
		getBreakForPortrait(index){
			let breakLetter = 7;
			if(window.innerWidth > 400){
				breakLetter += Math.floor((window.innerWidth - 350) / 50);
			}
			return this.letters.length > breakLetter && (index === Math.floor(this.letters.length/2));
		},
		getLocationLevelClasses(level){
			let arrClasses = [];
			if(level > 1 && this.locationStars[level-2] === 0){
				arrClasses.push('level_close');
			}

			if(this.eventLocation) return arrClasses;

			if(this.gameLocation === 'fbv' || this.gameLocation === 'animals' || this.gameLocation === 'eightMarch' || window.innerHeight > window.innerWidth){
				if((level % 2) === 1){
					arrClasses.push('location__upLevel');
				}
			}else{
				if((level % 2) === 0){
					arrClasses.push('location__upLevel');
				}
			}

			return arrClasses;
		},
		toggleShowInfoAboutStars(){
			this.showInfoAboutStars = !this.showInfoAboutStars;

			// if(this.showInfoAboutPageNumber){
			// 	params({'pageNumClick': 1});
			// }
		},
		toggleShowInfoAboutPageNumber(){

			this.showInfoAboutPageNumber = !this.showInfoAboutPageNumber;

			if(this.showInfoAboutPageNumber){
				this.pageNumVal = this.location+1;
			}

			// if(this.showInfoAboutPageNumber){
			// 	params({'pageNumClick': 1});
			// }
		},
		changePageNum(){
			let num = Number(this.pageNumVal);
			// params({'changePageNum': 1});
			if(num){
				this.location = num - 1;
			}

		},
		getLocationName(loc){
			return translatedLocationsNames[loc];
		},
		getLocationAllStarsByLocation(loc){
			return getLocationStars(loc).reduce((acc, el)=> acc+ el, 0);
		},
		getLocationStyles(level){
			if(window.innerHeight > window.innerWidth){
				return {bottom: this.getLevelLocationBottom(level)};
			}else{
				return {left: this.getLevelLocationLeft(level)};
			}

		},
		getLevelLocationBottom(level){
			if(level === 1) return  '3.2%';

			if(level < 6){
				return level * 4.5 + '%';
			}else if(level < 8){
				return 3 + level * 4.5 + '%';
			}else if(level < 10 || level === 12 || level === 18){
				return 5 + level * 4.5 + '%';
			} else if(level === 10){
				return 6 + level * 4.5 + '%';
			}else if(level < 16){
				return 4 + level * 4.5 + '%';
			}else if(level === 16){
				return 5.5 + level * 4.5 + '%';
			}else if(level === 20){
				return 3.5 + level * 4.5 + '%';
			} else{
				return 4 + level * 4.5 + '%';
			}


		},
		getLevelLocationLeft(level){
			if(level === 1) return '0.5%';

			if(this.gameLocation === 'animals'){

				if(level < 4){
					return (level-1) * 5 + '%';
				}else if(level < 7){
					return 3 + (level-1) * 4.5 + '%';
				}else if(level === 7){
					return 5 + (level-1) * 4.5 + '%';
				} else if (level < 10){
					return 6 + (level-1) * 4.5 + '%';
				}else if(level < 12){
					return 8 + (level-1) * 4.5 + '%';
				}else if(level === 12){
					return 9 + (level-1) * 4.5 + '%';
				}else{
					return 10 + (level-1) * 4.5 + '%';
				}

			}else if(this.gameLocation === 'eightMarch' || this.gameLocation === 'fbv') {
				if(level < 8){
					return (level-1) * 5 + '%';
				}
				return (level-1) * 5 - 1.5 + '%';

			}else{
				if(level < 7){
					return (level-1) * 5 + '%';
				}
				return 1.5+ (level-1) * 5 + '%';
			}

		},
		goToGetLocations(){
			params({'goToGetLValentine': 1});
			this.backMenu();
			this.showLocations = true;
			this.showLastLevelInfo = false;
		},
		openGameLocation(location){
			if(this.blockedLocations.includes(location)) return;
			this.eventLocation = false;
			this.endTutorial();
			this.levels = false;
			this.showLocations = false;
			this.showGameLocation = true;
			this.gameLocation = location;
			this.locationStars = getLocationStars(location);
			this.getShowingLastLevelInLocation();
			addScrollingToDesktop();
			if(location === 'event') {
				eventScore = getEventScore(newYearProgress);
				this.openEventLocation();
				if(!infoAboutEvent){
					this.toggleRules();
					setToStorage('infoAboutEvent', 'true');
				}
				if(testShowResult() && !gotEventBfGift){
					this.toggleIsEventResult();
				}
			}
		},
		getShowingLastLevelInLocation(){
			setTimeout(()=>{
				try{
					let lastLevel = 0;
					for(let i = this.locationStars.length-1; i >= 0; i--){
						if(this.locationStars[i] !== 0) {
							lastLevel = i;
							break;
						}
					}

					let scrollEl = document.querySelectorAll('.location__level')[lastLevel];
					scrollIntoViewX(document.querySelector('#app'), scrollEl, {behavior: 'smooth', align: 'center'});
				}catch(e){}
			}, 300)
		},
		toggleShowLocations(){
			this.showLocations = !this.showLocations;
		},
		toggleShowBigWordWas(){
			this.showBigWordWas = !this.showBigWordWas;
		},
		toggleLastSounds(e){
			this.lastSounds = e.target.checked;
			setToStorage('lastSounds', this.lastSounds);
		},
		toggleOpenNewBg(){
			if(this.openNewBg){
				this.openNewBg = false;
			}else if(!this.bgShowen){
				this.openNewBg = true;
				this.bgShowen = true;
			}
		},
		changeBgRight(){
			this.chosenBg++;
			if(this.chosenBg === 7) this.chosenBg = -4;
			this.testBg();
		},
		changeBgLeft(){
			this.chosenBg--;
			if(this.chosenBg === -5) this.chosenBg = 6;
			this.testBg();
		},
		testBg(){
			if(this.chosenBg > 0 && !this.isCloseLevelShow(bgLvlsOpen[this.chosenBg-1]+1)){
				this.chosenBgRight = this.chosenBg;
				// importBg(this.chosenBgRight);
			}else if(this.chosenBg <= 0){
				this.chosenBgRight = this.chosenBg;
			}
			// params({'choseBg': this.chosenBgRight});
			setToStorage('chosenBackground', this.chosenBgRight);
		},
		goChangeBgFromUpdate(){
			this.goToChangeBg();
			this.chosenBg = 6;
			this.chosenBgRight = this.chosenBg;
			this.tryChangeMusic();
			setToStorage('chosenBackground', this.chosenBgRight);
			params({'changeBgNew2024': 1});
		},
		getInfoAboutNewUpdate(){
			this.wasUpdate = true;
			this.showLastLevelInfo = true;
		},
		goToChangeBg(fromUpdate){
			this.backMenu();
			this.toggleSettings();
			this.openNewBg = false;
			// let bg = 1;
			// if(this.lvl === 14){
			// 	bg = 2;
			// }else if(this.lvl === 24){
			// 	bg = 3;
			// }else if(fromUpdate){
			// 	params({'testGreenBg': 1});
			// 	bg = 5;
			// }
			// this.chosenBg = bg;
			// this.chosenBgRight = bg;
			// setToStorage('chosenBackground', this.chosenBgRight);
			this.showLastLevelInfo = false;
		},
		findNotShowLetters(){
			try{
				let remainingWords = this.nowWords.slice().filter((w) => !this.doneWords.includes(w));
				let notShow = [];
				for(let i = 0; i < this.letters.length; i++){
					let l = this.letters[i];
					let notShowLetter = true;
					for(let q = 0; q < remainingWords.length; q++){
						if(remainingWords[q].includes(l)){
							notShowLetter = false;
							break;
						}
					}
					if(notShowLetter){
						notShow.push(l);
					}
				}
				this.notShowLetters = notShow;
			}catch(e){
				this.notShowLetters = [];
			}
		},
		skipTutorial(){
			if(this.payloadTutorial){
				params({'skipPayloadTutorial': 1});
			}else{
				params({'skipNewTutorial': 1});
				skipNewTutorial = true;
			}
			this.endTutorial();
		},
		endTutorial(){
			console.log('end');
			this.payloadTutorial = false;
		 	this.isTutorial = false;
		 	this.cloudHint = false;
			this.selectTip = false;
			this.selectMainWord = false;
			this.selectSend = false;
			this.tutorialSelected = -1;
		},
		startTutorial(){
			console.log('Start tutorial');
			tutorialStep = 0;
			this.cloudsPhrase = cloudPhrases[0];
			this.canShowSkip = true;
			this.isTutorial = true;
			this.cloudHint = true;
		},
		letterClasses(delay){
			if(this.endType) return {}
			return {
				animationDelay: delay
			}
		},
		setCloudsPhrase(text){
			this.cloudsPhrase = '';
			this.endType = false;
			let cloudsPhrase = [];
			let firstIndex = text.indexOf('<span class="cloudHint__mainText">');
			text = text.slice(0, firstIndex) + text.slice(firstIndex + 34);
			let secondIndex = text.indexOf('</span>');
			text = text.slice(0, secondIndex) + text.slice(secondIndex + 7);
			let endTime = Math.floor(text.length/30 * 1000);
			for(let i = 0; i < text.length; i++){
				let animationDelay = i/30+'s'
				let isSelected = i >= firstIndex && i <= secondIndex;
				cloudsPhrase.push([text[i], animationDelay, isSelected])
			}
			isTextTyping = true;
			setTimeout(()=>{
				isTextTyping = false;
			}, endTime)

			this.cloudsPhrase = cloudsPhrase;
		},
		closeHint(){
			if(tutorialStep === 50){
				this.cloudHint = false;
				return;
			}
			if(isTextTyping){
				this.endType = true;
				console.log(this.endType);
				isTextTyping = false;
				return;
			}
			if(this.payloadTutorial){
				tutorialStep++;
				if(tutorialStep >= cloudPayloadPhrases.length){
					this.endTutorial();
					return;
				}
				this.cloudsPhrase = cloudPayloadPhrases[tutorialStep];
				return;
			}
			if(this.selectSend) return;
			if(this.lvl !== 0){
				this.cloudHint = false;
				return;
			}
			if(tutorialStep === 0){
				// this.cloudsPhrase = cloudPhrases[1];
				this.setCloudsPhrase(cloudPhrases[1])
				this.tutorialSelected = 0;
				if(notRussianGame) this.tutorialSelected = 5;
			} else if(tutorialStep === 5){
				this.tutorialSelected = 2;
				if(notRussianGame) this.tutorialSelected = 0;
				this.cloudsPhrase = cloudPhrases[1];
			} else if(tutorialStep === 10){
				this.tutorialSelected = 1;
				if(notRussianGame) this.tutorialSelected = 2;
				this.cloudsPhrase = cloudPhrases[1];
			}else if(tutorialStep === 17){
				this.setCloudsPhrase(cloudPhrases[8])
			}else if(tutorialStep === 18){
				this.endTutorial();
			}else{
				return;
			}
			this.wordFromLetter = '';
			this.selectedLetters = [];
			tutorialStep++;

			// this.cloudHint = false;
		},
		openLevelHint(lvl){
			if(notRussianGame) return;
			this.cloudHint = true;
			if(lvl === 7){
				this.cloudsPhrase = infoAboutLocation;
			}else if(lvl === 3){
				this.cloudsPhrase = infoAboutEletter
			}

		},

		nextStep(){

			if(tutorialStep >=1 && tutorialStep <= 3){
				this.tutorialSelected = 2 + tutorialStep;
				if(notRussianGame){
					this.tutorialSelected = 1 + tutorialStep;
				}
			}else if(tutorialStep === 6){
				this.tutorialSelected = 1;
			}else if(tutorialStep === 7){
				this.tutorialSelected = 4;
				if(notRussianGame) this.tutorialSelected = 2;
			}else if(tutorialStep === 8 || tutorialStep === 13){
				this.tutorialSelected = 5;
				if(notRussianGame) {
					this.tutorialSelected = 3;
					if(tutorialStep === 13) this.tutorialSelected = 1;
				}
			} else if(tutorialStep === 11){
				this.tutorialSelected = 2;
				if(notRussianGame) this.tutorialSelected = 4;
			}else if(tutorialStep === 12){
				this.tutorialSelected = 3;
				if(notRussianGame) this.tutorialSelected = 6;
			}else if(tutorialStep === 4 || tutorialStep === 9 || tutorialStep === 14){
				this.tutorialSelected = -1;
				this.selectSend = true;
				if(tutorialStep === 4){
					this.setCloudsPhrase(cloudPhrases[2]);
				}else{
					this.cloudsPhrase = cloudPhrases[2];
				}
			}else{
				return;
			}
			tutorialStep++;
		},
		toggleSubscribeCompleted(){
			this.subscribeCompleted = false;
		},
		togglePurchaseCompleted(){
			this.purchaseCompleted = false;
		},
		getAuth(){
			if(process.env.PLATFORM === 'yandex'){
				try{
					YSDK.auth.openAuthDialog().then(() => {
						initPlayer(YSDK);
						this.isPlayerAuth = true;
					}).catch((e) => {
						console.log(e);
					});
				}catch(ignored){}
			}


		},
		getPlayerLB(getGameLb, getEventLb){
			/*
			this.playerRait = {
				rank: 14, score: 19, player: {uniqueID: 123}
			};
			this.lbInGame = [
				{rank: 1, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 2, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 3, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 4, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 5, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 6, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 7, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 8, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 9, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 10, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 11, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 12, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 13, score: 21, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 14, score: 19, player: {uniqueID: 123, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 15, score: 18, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 16, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 17, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 18, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 19, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
				{rank: 20, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			].reverse();
			goToUserInLb();
			return;*/



			try{
				let that = this;

				if(process.env.PLATFORM === 'yandex'){
					YSDK.getLeaderboards()
					.then(lb => {
						function getMyLbByName(name){
							//Получаем игрока
							lb.getLeaderboardPlayerEntry(name)
								.then(player => {
									console.log(player);
									that.playerRait = player;
									if(getGameLb){
										lb.getLeaderboardEntries(name, {quantityTop: 1, includeUser: true, quantityAround: 10}).then(res => {
											that.lbInGame = res.entries.reverse();
											goToUserInLb();
										})
									}

									if(getEventLb){
										eventScore = getEventScore(newYearProgress);
										console.log('myScore: ', eventScore);
										if(eventScore > player.score && !testSendResult()){
											lb.setLeaderboardScore('event', eventScore);
										}
									}else{
										if(that.allStars > player.score
											&& that.allStars <= allWords.length*3
											&& !that.scamTest()){
											lb.setLeaderboardScore('lvl', that.allStars);
										}
									}

								})
								.catch(e => {
									console.log(e);
								})
						}
						if(getEventLb) getMyLbByName('event');
						else getMyLbByName('lvl');


					});
				}else if(process.env.PLATFORM === 'gp'){
					if(GP){
						this.lbInGame = false;
					}
				}
				
			}catch(e){
				this.playerRait = false;
				console.log(e);
			}
		},
		addPlayerToLB(fromTestStars){
			let that = this;
			try{
				if(process.env.PLATFORM === 'yandex'){
					YSDK.getLeaderboards()
					.then(lb => {
						if(this.eventLocation) {
							if(!testSendResult()){
								lb.setLeaderboardScore('event', eventScore);
							}
						}
						else {
							let stars = that.allStars;
							if(that.scamTest()) stars = 0;
							if(stars <= allWords.length*3){
								lb.setLeaderboardScore('lvl', stars);
							}
						}
						if(fromTestStars){
							this.getLeaderBoardInGame();
						}

					});
				}else if(process.env.PLATFORM === 'gp'){
					if(GP){
						console.log('setSCore');
						GP.player.set('score', this.allStars);
						setState(true);
						if(fromTestStars){
							this.getLeaderBoardInGame();
						}
					}
				}

			}catch(e){
				console.log(e);
			}
		},
		getLeaderBoard(getEventLb){
			if(process.env.PLATFORM === 'yandex'){
				let that = this;
				this.getPlayerLB(false, getEventLb);
				YSDK.getLeaderboards()
					.then(lb => {
						console.log(lb);
						function getLbByName(name){
							// Получение 10 топов
							lb.getLeaderboardEntries(name, { quantityTop: 20, includeUser: true, quantityAround: 10}).then(res => {
								goToUserInLb();
								// if(name === 'event'){
								// 	Object.keys(res.entries).forEach((a)=>{
								// 		res.entries[a].rank = res.entries[a].rank;
								// 	})
								// }
								that.leaderBoard = res.entries;
								console.log(that.leaderBoard);
							}).catch((error)=>{
								console.log('er', error);
								//Пробуем без юзера
								lb.getLeaderboardEntries(name, { quantityTop: 20}).then(res => {
									that.leaderBoard = res.entries;
									console.log(that.leaderBoard);
								});
							});
						}
						if(getEventLb){
							getLbByName('event');
						}else{
							getLbByName('lvl');
						}
					})
					.catch(e => {
						that.leaderBoard = false;
						console.log(e);
					});
			}else if(process.env.PLATFORM === 'gp'){
				let that = this;
				GP.leaderboard.fetch({
					// Сортировка по полям слева направо
					orderBy: ['score'],
					// Сортировка DESC — сначала большие значение, ASC — сначала маленькие
					order: 'DESC',
					// Количество игроков в списке
					limit: 20,
					// Включить список полей для отображения в таблице, помимо orderBy
					includeFields: ['score'],
					/**
					 * Показывать ли текущего игрока в списке, если он не попал в топ
					 * none — не показывать
					 * first — показать первым
					 * last — показать последним
					 */
					withMe: 'last',
					showNearest: 3
				}).then((res)=>{
					console.log(res);
					console.log('PLAYER POSIION:', res.player.position)
					console.log(res.players);
					that.playerRait = res.player;
					that.leaderBoard = res.players;
				}).catch((e)=>{console.log(e)});	
			}
		},
		getLeaderBoardInGame(){
			if(window.innerHeight >= 450){
				this.getPlayerLB(true, this.eventLocation);
			}
		},
		toggleLeaderBoard(getEventLb){
			this.isLeaderBoard = !this.isLeaderBoard;
			if(this.isLeaderBoard){
				this.getLeaderBoard(getEventLb);
			}
		},
		toggleShowWordDesc(){
			this.showWordDesc = !this.showWordDesc;
			if(!this.showWordDesc){
				getDefaultDesc();
			}
			this.selectMainWord = '';
			if(!this.showWordDesc && this.isTutorial && tutorialStep === 15){
				this.setCloudsPhrase(cloudPhrases[6])
				tutorialStep++;
				this.selectMainWord = false;
				this.selectTip = true;
			}
		},
		getItemPrice(item){
			try{
				if(paymentCatalog){
					if(process.env.PLATFORM === 'yandex'){
						return paymentCatalog[item].price;
					}else if(process.env.PLATFORM === 'gp'){
						return paymentCatalog[item].price + ' ' + paymentCatalog[item].currencySymbol;
					}
				}
			}catch(e){}
			if(process.env.PLATFORM === 'gp'){
				if(this.platformType === 'OK') return itemsPricesOK[item] + ' ОК';
				return itemsPricesVK[item] + ' Голосов';
			}
			return itemsPrices[item] + ' Ян';
		},
		toggleShowLastLevelInfo(){
			this.showLastLevelInfo = false;
			this.wasUpdate = false;
		},
		toggleGameUpdate(){
			this.gameUpdate = false;
			setToStorage('gameUpdate-1', 'false');
		},
		setCanShowAdv(){
			this.canShowAdv = advTime;
		},
		changeGameAdvShow(){
			this.isGameAdvShow = false;
			isGameAdvShow = false;
			setToStorage('isGameAdvShow', 'true');
		},
		updateAll() {
			// if(!deleteBlockBg) return;
			console.log('update');
			allStars = [];
			loc = 0;
			console.log(allDoneWords);
			setLoc();

			if(lastLevel !== 0){
				playerPlayedAlready = true;
			}
			this.isLeaderBoard = false;
			this.stars = allStars;
			this.location = loc;
			this.tipCount = tips;
			this.notRussian = notRussianGame;
			setToStorage('tips', this.tipCount);
			this.isSounds = sounds;
			deletePreDownload();
			this.getPlayerLB();
			if(isRules && isShowTutorial && !payloadLevel && lastLevel === 0){
				this.openLastLevel();
				this.startTutorial();
			}else{
				if(window.innerHeight > window.innerWidth){
					if(!payloadVertical){
						// this.toggleShowInfoAboutPortrait();
					}
				}
				this.endTutorial();
			}

			this.tryOpenPayloadLevel();

			this.gameLastLevel = lastLevel;
		},
		tryOpenPayloadLevel(){
			if(payloadLevel){
				this.getLevel();
				// this.rules = true;
			}
		},
		toggleLevelClosedShow(){
			this.levelClosedShow = !this.levelClosedShow;
		},
		getLevel(lvl, notSound, fromMenu){
			if(showNextPayloadTutorial){
				this.endTutorial();
				this.startPayloadTutorial();
				params({'payloadTutor2': 1});
			} else if(payloadLevel){
				lvl = payloadLevel;
				payloadLevel = false;
				if(lastLevel < lvl) lastLevel = lvl;
				params({'payload': 1});
				this.endTutorial();
				if(!playerPlayedAlready){
					this.startPayloadTutorial();
					if(payloadVertical){
						this.verticalPayload = true;
					}
					this.tipCount = 30;
				}
				isShowTutorial = false;
				this.location = Math.floor(lvl/lvlsOnPage);
				this.rules = false;

			} else if(this.isCloseLevelShow(lvl+1)){
				console.log('dasd ', fromMenu);
				if(fromMenu){
					this.toggleLevelClosedShow();
					this.closedLevel = lvl;
				}
				return;
			}
			this.getRandomStars(true);
			// if(window.innerWidth > window.innerHeight){
			// 	params({'orientation': 'landscape'});
			// }else{
			// 	params({'orientation': 'portrait'});
			// }


			if(lvl !== 0 && lvl % 100 === 0 && notRussianGame){
				let name = 'eng' + lvl;
				params({[name]: 1});
			}




			this.closeAllBeforeStartLevel(notSound);

			this.lvl = lvl;
			this.word = allWords[lvl];
			// console.log('doneWord', this.word, allDoneWords[this.word]);
			this.doneWords = allDoneWords[this.word];
			this.fixedWord = fixWordToNormal(this.word);
			if(allDoneWords[this.word] === 1){
				this.doneWords = chooseRightWordFromWords(this.word);
			}else if(allDoneWords[this.word] === undefined){

				allDoneWords[this.word] = [];
				this.doneWords = allDoneWords[this.word];
			}
			// if(this.lvl < 10 && this.doneWords.length === 0){
			// 	let lvlParams = 'startLevel-' + this.lvl;
			// 	params({[lvlParams]: 1});
			// }

			if(this.doneWords.length === 0 && bgLvlsOpen.includes(lvl)){
				this.toggleOpenNewBg();
			}
			if(this.doneWords.length === 0 && lvl === 0){
				try{
					params({'getLevel0': 1});
				}catch(e){}
			}



			this.letters = this.fixedWord.split('');
			this.nowWords = chooseRightWordFromWords(this.word).slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});

			this.levelStars = testStar(this.doneWords.length, this.nowWords.length);

			this.findNotShowLetters();

			// this.tryShowAdv();
			if(this.doneWords.length === 0){
				if(this.lvl === 3 || this.lvl === 7){
					this.openLevelHint(this.lvl);
				}else if(this.lvl === 5){
					this.getLvl5Hint();
				}
			}
			/*try{
				if(this.doneWords.length === 0 && (lvl === 4 || lvl === 9 || lvl === 19 || lvl === 29
					|| lvl === 39 || lvl === 49 || lvl === 99 || lvl === 199 || lvl === 299
					|| lvl === 399 || lvl === 499)){
					let name = 'tipsLvl' + (lvl + 1);
					params({[name]: this.tipCount})
				}
			}catch(e){
				console.log(e);
			}*/


			if(!firstGetBanner){
				firstGetBanner = true;
				this.getLBorBanner();
			}
		},
		getLvl5Hint(){
			if(notRussianGame || isLvlFiveHintDone) return;
			setToStorage('isLvlFiveHintDone', 'true');
			this.cloudHint = true;
			this.cloudsPhrase = lvl5Phrase;
			this.tipCount += 10;
			setToStorage('tips', this.tipCount);
			isLvlFiveHintDone = true;
			PLAYERSTATS.tips = this.tipCount;
		},
		getLBorBanner(){
			if(this.verticalPayload) return;
			this.getLeaderBoardInGame();
		},
		closeAllBeforeStartLevel(notSound){
			this.advShowNow = false;
			this.levelsAnim = false;
			this.wordSwing = '';
			this.isEndGame = false;

			if(!notSound){
				this.isGameAdvShow = isGameAdvShow;
			}

			if(this.isSounds && !notSound){
				clickSound.play();
			}

			this.getStar = -1;
			setTimeout(()=>{
				this.levels = false;
				this.showGameLocation = false;
			}, 500);

			this.content = true;

			this.newWord ='';
			this.animWord ='';
			this.animWordStart = '';
			this.wordFromLetter = '';
			this.selectedLetters = [];
			this.locationGame = false;

			setTimeout(()=>{
				document.querySelector('.words').scrollTo({
					left: 0,
					behavior: "smooth"
				});
			}, 200);
		},
		getLocationLevel(level){
			if(level > 0 && this.locationStars[level-1] === 0) return;
			// params({'getLocationLevel': 1});
			this.closeAllBeforeStartLevel();
			this.locationGame = true;
			this.lvl = level;
			this.word = locationWords[this.gameLocation][level];
			this.letters = this.word.split('');

			if(this.eventLocation){
				this.doneWords = newYearProgress[this.word];
				if(newYearProgress[this.word] === 1){
					this.doneWords = locationWords.wordsFromWords[this.word];
				}else if(newYearProgress[this.word] === undefined){
					newYearProgress[this.word] = [];
					this.doneWords = newYearProgress[this.word];
				}

				this.getLBorBanner();
			}else{
				this.doneWords = locationDoneWords[this.word];
				if(locationDoneWords[this.word] === 1){
					this.doneWords = locationWords.wordsFromWords[this.word];
				}else if(locationDoneWords[this.word] === undefined){
					locationDoneWords[this.word] = [];
					this.doneWords = locationDoneWords[this.word];
				}
			}
			// if(this.doneWords.length === 0){
			// 	if(this.lvl === 0 || this.lvl === 4 || this.lvl === 9 || this.lvl === 19) {
			// 		if(this.gameLocation === 'newYear'){
			// 			params({['startLocationLevel-' + this.lvl]: 1});
			// 		}else if(this.gameLocation === 'magicTales'){
			// 			params({['startMagicLocation-' + this.lvl]: 1});
			// 		}
			//
			// 	}
			// }

			this.nowWords = locationWords.wordsFromWords[this.word].slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});

			this.findNotShowLetters();
			this.lbInGame = false;
			this.levelStars = testStar(this.doneWords.length, this.nowWords.length);

		},
		getLevelByLevelAndLocation(level){
			return (this.location*lvlsOnPage) + level;
		},
		toggleSettings(){
			this.isSettings = !this.isSettings;
			if(this.isSettings){
				this.allGamesInfo = allGamesInfo;
			}
			this.chosenBg = this.chosenBgRight;
		},
		addBuyTips(){
			console.log('addBuyTips', TIPS);
			this.tipCount += TIPS;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
			this.purchaseCompleted = true;
			this.shop = false;
			setStats();
		},
		switchOpenLocations(){
			allOpenedLocations.forEach(loc => {
				let index = this.blockedLocations.indexOf(loc);
				if(index !== -1){
					this.blockedLocations.splice(index, 1);
				}
			})
		},
		unableAds(){
			console.log('unableAds');
			this.notShowAds = false;
			this.shop = false;
		},
		disableAds(){
			try{
				console.log('disableAds');
				this.notShowAds = true;
				if(this.platformBuild === 'yandex'){
					YSDK.adv.hideBannerAdv();
				}
				this.shop = false
				if(toggleSubscribeCompleted){
					this.subscribeCompleted = true;
				}
			}catch(e){
				console.log(e);
			}

		},
		buyTip(item){
			if(item === 'cart_item6' && this.platformBuild === 'gp' && this.notShowAds){
				GP.payments.unsubscribe({ tag: 'cart_item6' });
			}else{
				buyTips(item);
			}
		},
		sendParams(par){
			try{
				params(par);
			}catch(ignored){}

		},
		toggleRules(){
			this.rules = !this.rules;
			this.isPlayerAuth = isPlayerAuth;
			this.sendParams({'openRules': 1});
		},
		tryOpenAuth(){
			try{
				YSDK.auth.openAuthDialog().then(() => {
					// Игрок успешно авторизован
					initPlayer(YSDK);
				}).catch(() => {
					// Игрок не авторизован.
				});
			}catch(e){}

		},
		goToShop(){
			params({'goToShop': 1 })
			this.showLastLevelInfo = false;
			this.toggleShop();
		},
		toggleShop(){
			this.shop = !this.shop;
		},
		switchSoundsTutorial(){
			this.isSounds = !this.isSounds;
			this.switchMusic({target: {checked: false}});
			setToStorage('sounds', this.isSounds);
			params({'soundTutorial': this.isSounds});
		},
		tryChangeMusic(){
			if(!this.isMusic){
				this.isMusic = true;
				musicSound.play();
				setToStorage('isMusic', this.isSounds);
			}
		},
		switchMusic(e){
			this.isMusic = e.target.checked;

			if(this.isMusic){
				switchOnNewYearMusic();
				musicSound.play();
			}else{
				musicSound.stop();
			}
			setToStorage('isMusic', this.isMusic);
		},
		switchSounds(e){
			this.isSounds = e.target.checked;
			setToStorage('sounds', this.isSounds);
		},
		closeShowAdvTip(){
			this.showAdvTip = false;
			this.isAdvShowed = false;
		},
		isCloseLevelShow(level){
			level--;
			if(level === 0 || (lastLevel === level-1 && this.stars[lastLevel] > 0)) return false;
			return lastLevel < level;
		},
		isLevelDone(level){
			level--;
			if(lastLevel === level && this.stars[lastLevel] === 0) return false;
			return lastLevel >= level;
		},
		openMainWordDescription(){
			this.toggleShowWordDesc();
			getWordDesc(fixWordToNormal(this.word));
		},
		openWordDescription(word){
			if(this.doneWords.includes(word)){
				this.toggleShowWordDesc();
				getWordDesc(word);
			}
		},
		clickSound(){
			if(this.isSounds){
				if(this.lastSounds){
					clickSound2.play();
				}else{
					clickSound.play();
				}
			}
		},
		pressKey(e){
			if(!this.content || this.gamePaused || this.isEndGame) return;
			if(this.isShowTimeToShowNextAdv && !this.notShowAdvPause) return;
			let letter = e.key;
			if(letter === 'Backspace'){
				if(this.isTutorial) return;
				this.selectedLetters.pop();
				this.wordFromLetter = this.wordFromLetter.slice(0, -1);
			}else if(letter === 'Enter'){
				if(this.isTutorial && !this.selectSend) return;
				this.sendWord();
			} else{
				letter = letter.toLowerCase();
				if(!notRussianGame && lettersMap[letter]) letter = lettersMap[letter].toLowerCase();
				if((this.isTutorial && letter !== this.word[this.tutorialSelected])
				|| this.notShowLetters.includes(letter)){
					return;
				}
				for(let i = 0; i < this.letters.length; i++){
					if(letter === this.letters[i] && !this.selectedLetters.includes(i)){
						this.selectedLetters.push(i);
						this.wordFromLetter += letter;
						this.clickSound();
						break;
					}
				}
				if(this.isTutorial){
					this.nextStep();
				}
			}
		},
		testShowNextLevel(){
			if(this.locationGame){
				if(this.eventLocation){
					return this.lvl !== (locationWords.event.length - 1) && this.locationStars[this.lvl] > 0;
				}
				return this.lvl !== 19 && this.locationStars[this.lvl] > 0;
			}
			if(this.lvl < lastLevel) return true;
			return this.lvl === lastLevel && this.stars[this.lvl] > 0;
		},
		prevLevel(){
			if(this.lvl === 0) return;
			if(this.locationGame){
				this.getLocationLevel(this.lvl-1);
			}else{
				this.getLevel(this.lvl-1);
			}
		},
		nextLevel(isFromContinue){
			if(this.locationGame){
				if(this.eventLocation){
					if(this.lvl === (locationWords.event.length - 1)) return;
				}else{
					if(this.lvl === 19) return;
				}

				if(this.locationStars[this.lvl] > 0){
					this.getLocationLevel(this.lvl+1);
				}
			}else if(this.testShowNextLevel()){
				if((this.lvl+1 === allWords.length) || (notRussianGame && this.lvl+1 === allWordsEN.length)){
					this.showLastLevelInfo = true;
					return;
				}
				this.getLevel(this.lvl+1);
				this.crossPromoShow();
			}
			if(isFromContinue){
				this.isEndGame = false;
			}
			this.tryShowAdv();
		},
		crossPromoShow(){
			if(crossPromoShows < 3){
				if(crossPromoObj) this.crossPromoObj = crossPromoObj;
				if(this.lvl >= 10 && this.crossPromoObj){
					params({[crossPromoName]: 1});
					this.crosspromo = true;
					crossPromoShows++;
					setToStorage(crossPromoName, crossPromoShows);
					crossPromoShows = 5;
				}
			}

		},
		prevLocation(){
			if(this.location > 0){
				this.location--;
				this.getRandomStars();
				this.clickSound();
			}
		},
		nextLocation(){
			if(!this.showNextLoc) return;
			if(this.location < this.allLocations-1){
				this.location++;
				this.getRandomStars();
				this.clickSound();
			}
		},
		selectLetter(index, ev){
			// if(this.animWordStart !== '') return;
			ev.stopPropagation();
			ev.preventDefault();
			if(this.notShowLetters.includes(this.letters[index])) return;
			this.clickSound();
			if(this.isTutorial){
				this.nextStep();
			}
			let ind = this.selectedLetters.indexOf(index);

			if(ind >= 0){
				this.selectedLetters.splice(ind, 1);
				this.wordFromLetter = this.wordFromLetter.slice(0, ind) + this.wordFromLetter.slice(ind+1);
			}else if(ind === -1 ){
				this.selectedLetters.push(index);
				this.wordFromLetter += this.letters[index];
			}
		},
		backMenu(noNeedEvent, isFromGameForTwo){
			if(this.isTutorial) return;
			if(isFromGameForTwo){
				this.gameForTwoState = false;
			}
			this.isGameForTwo = false;
			this.isMyGame = false;
			this.isEndGame = false;
			this.getRandomStars();
			if(this.isSounds){
				clickSound.play();
			}
			if(this.locationGame){
				this.showGameLocation = true;
				this.levelsAnim =  true;
				setTimeout(()=>{
					this.content = false;
					this.locationGame = false;
					this.getShowingLastLevelInLocation();
				}, 500);
			}else{
				this.eventLocation = false;
				this.gameLocation = '';
				this.levels =  true;
				this.levelsAnim =  true;
				this.showGameLocation = false;
				setTimeout(()=>{
					this.levels =  true;
					this.content = false;
					console.log('Вызов баннера');
					// getBanner();
					this.locationGame = false;
				}, 500);
			}
			// this.tryShowAdv();


		},
		addTip(isAddTwo){
			this.tipCount += 1;
			if(isAddTwo) this.tipCount += 1;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
		},
		toggleShowAdvError(){
			this.showAdvError = !this.showAdvError;
		},
		getTip(){
			if(this.eventLocation){
				this.toggleIsInfoAboutTips();
				return;
			}
			if(this.animWordStart !== '' || (this.tipCount < 1 && this.advTimer > 0) || this.isGameForTwo) return;
			if(this.tipCount < 1){
				try{
					if(process.env.PLATFORM === 'yandex'){
						let that = this;
						function getRewardedVideo(){
							YSDK.adv.showRewardedVideo({
								callbacks: {
									onOpen: function(){
										switchOffMainMusic();
										musicStoppedByAdv = true;
									},
									onClose: function(){
										console.log('sss');
										switchOnMainMusic();
										musicStoppedByAdv = false;
									},
									onRewarded: () => {
										params({'rewardedVideo': 1});
										console.log('close adv reward');
										startAdvTime = true;

										clearTimeout(advTimeout);
										clearInterval(advInterval);
										timeToShowAdv = 20;
										startAdvInterval();
										that.startRewardedTimer();
										that.addTip(true);
									},
									onError: () => {
										that.toggleShowAdvError();
									}
								}
							})
						}
						getRewardedVideo();
					} else if(process.env.PLATFORM === 'gp'){
						let that = this;
						if(!onRewardedAlreadyDone){
							GP.ads.on('rewarded:reward', () => {
								console.log('get reward');
								params({'rewardedAdv': 1});
								that.addTip(true);
							});
							GP.ads.on('rewarded:close', (success) => {
								console.log('close adv reward');
								advTime = false;
								startAdvTime = true;

								clearTimeout(advTimeout);
								clearInterval(advInterval);

								timeToShowAdv = 119;
								startAdvInterval();
								advTimeout = setTimeout(()=>{
									advTime = true;
								}, 119000);
							});
							onRewardedAlreadyDone = true;
						}
						GP.ads.showRewardedVideo()
					}
				}catch(e){
					console.log(e);
				}
				return;
			}
			if(this.doneWords.length === this.nowWords.length) return;
			if(this.lvl > 0 || this.locationGame){
				this.tipCount--;
			}
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
			if(this.tipCount === 0 && !advTime){
				if(startAdvTime){
					this.startRewardedTimer();
				}else{
					startAdvTime = true;
				}
			}
			let arr = [];
			if(this.isMyGame){
				arr = this.wordsThisLevel.slice();
			} else if(this.locationGame){
				arr = locationWords.wordsFromWords[this.word].slice();
			}else{
				arr = chooseRightWordFromWords(this.word).slice();
			}

			for(let i = 0; i < this.doneWords.length; i++){
				arr.splice(arr.indexOf(this.doneWords[i]), 1);
			}
			let rand = Math.floor(Math.random()*arr.length);
			this.wordFromLetter = arr[rand];
			// if(Math.random() > 0.9){
			// 	this.wordSwing = this.wordFromLetter;
			// }

			this.sendWord(true);


			if(this.isTutorial && tutorialStep === 16){
				this.cloudHint = false;
				this.selectTip = false;
				tutorialStep++;
				setTimeout(()=>{
					this.cloudHint = true;
					this.setCloudsPhrase(cloudPhrases[7])
				}, 2000);
			}
		},
		tryShowAdv(){
			console.log('tryShowAdv');
			if(this.verticalPayload || this.notShowAds || this.isShowTimeToShowNextAdv || this.isGameForTwo) return;
			if(!this.isTutorial && this.lvl > 1 && this.advTimer <= 0){
				if(showAdv && advTime){
					globalTryShowAdv(this.startRewardedTimer);
					// if(ysdkFlags){
					// 	if(ysdkFlags.testAdv === 'noPause'){
					// 		this.notShowAdvPause = true;
					// 	}else if(ysdkFlags.testAdv === 'noTimer'){
					// 		globalTryShowAdv(this.startRewardedTimer);
					// 		return;
					// 	}else if(ysdkFlags.testAdv === 'noAdv'){
					// 		return;
					// 	}
					// }
					// this.timeToShowNextAdv = 3;
					// this.isShowTimeToShowNextAdv = true;
					// let interval;
					// interval = setInterval(()=>{
					// 	this.timeToShowNextAdv = this.timeToShowNextAdv - 1;
					// 	if(this.timeToShowNextAdv <= 0){
					// 		globalTryShowAdv(this.startRewardedTimer);
					// 		this.isShowTimeToShowNextAdv = false;
					// 		clearInterval(interval);
					// 	}
					// }, 1000);

				}

			}
		},
		doShowCompliment(){
			setTimeout(()=>{
				this.complimentWord = goodWords[Math.floor(Math.random() * goodWords.length)];
				this.showCompliment = true;
				setTimeout(()=>{
					this.showCompliment = false;
				}, 2000)
			}, 200);
		},
		sendWord(fromTip){
			if(this.wordFromLetter.length === 0 || this.isBadWord || this.sendWordForbidden) return;


			if(this.nowWords.includes(this.wordFromLetter) && !this.doneWords.includes(this.wordFromLetter)){
				this.animWordStart = this.wordFromLetter;
				let wordFromLetter = this.wordFromLetter;
				this.wordFromLetter = '';
				this.selectedLetters = [];
				//Туториал
				if(this.isTutorial){
					if(tutorialStep === 5 || tutorialStep === 10 || tutorialStep === 15){
						this.cloudHint = false;
						this.selectSend = false;
						setTimeout(()=>{
							this.cloudHint = true;
							if(tutorialStep === 5){
								this.setCloudsPhrase(cloudPhrases[3]);
							}else if(tutorialStep === 10){
								console.log(cloudPhrases[4]);
								this.setCloudsPhrase(cloudPhrases[4]);
							}else if(tutorialStep === 15){
								this.setCloudsPhrase(cloudPhrases[5]);
								this.selectMainWord = 'илот';
								if(notRussianGame) this.selectMainWord = 'apex';


								setTimeout(()=>{
									try{
										let scrollEl = document.querySelector('.tutorialSelected');
										scrollIntoViewX(document.querySelector('.words'), scrollEl, {behavior: 'smooth', align: 'center'});
									}catch(ignored){}

								}, 200);

							}

						}, 1700);
					}


				}
				//Туториал - END

				if(!fromTip && wordFromLetter === this.nowWords[this.nowWords.length-1]){
					this.doShowCompliment();
				}

				setTimeout(()=>{
					try{
						let scrollEl = document.querySelector('.animWordStart');
						let container = document.querySelector('.words');
						scrollIntoViewX(container, scrollEl, {behavior: 'auto', align: 'center'});

					}catch(e){
						console.log('Ошибка показа');
					}
					if(this.isSounds){
						if(this.lastSounds){
							doneWordSound2.play();
						}else{
							doneWordSound.play();
						}

					}
					this.addWord(wordFromLetter);
					this.animWord = wordFromLetter;
					this.newWord = wordFromLetter;
					if(this.isGameForTwo){
						if(this.gameForTwoState.firstPlayerMove){
							this.gameForTwoState.firstPlayer.words.push(wordFromLetter);
						}else{
							this.gameForTwoState.secondPlayer.words.push(wordFromLetter);
						}
						this.sendWordForbidden = true;
						setTimeout(()=>{
							this.nextTurnGameForTwo();
							this.sendWordForbidden = false;
							this.wordFromLetter = '';
							this.selectedLetters = [];
							this.testForEndGameForTwo();
							setToStorage('savedForTwo', JSON.stringify(this.gameForTwoState));
						}, 1100)
					}else if(this.isMyGame){
						let obj = {word: this.word, words: this.doneWords.slice()};
						console.log(obj);
						setToStorage('savedMyGame', JSON.stringify(obj));
						this.savedMyGame = obj;
					}else if(this.locationGame){
						if(this.eventLocation){
							eventWord++;
							if(eventWord >= 5 || testFastSendResult()){
								this.addPlayerToLB(false);
								console.log('add player');
								eventWord = 0;
							}
							if(testSendResult() && !infoAboutClosedEvent){
								this.toggleInfoAboutClosedEvent();
								infoAboutClosedEvent = true;
								setToStorage('infoAboutClosedEvent2', 'true');
								console.log("DONE");
							}
							setToStorage('newYearProgress', JSON.stringify(replaceLevelsToOne(newYearProgress, true)));
							eventScore += wordFromLetter.length;

						}else{
							setToStorage('locationDoneWords', JSON.stringify(compressData(locationDoneWords, true)));
							PLAYESTATE.locationDoneWords = locationDoneWords;
						}

					}else{
						setToStorage('allDoneWords', allDoneWords);
						PLAYESTATE.allDoneWords = allDoneWords;
					}

					saveAllData();


					setTimeout(()=>{
						this.animWordStart = '';
						this.animWord = '';
						this.findNotShowLetters();

						this.testStars();

					}, 1000)
				}, 100);


			}else{
				this.isBadWord = true;

				this.tryShowAdv();


				if(this.doneWords.includes(this.wordFromLetter)){
					if(this.isSounds){
						wordWasSound.play();
					}
					this.wordWasIndex = this.nowWords.indexOf(this.wordFromLetter);
					setTimeout(()=>{
						try{
							let scrollEl = document.querySelector('.wordWas');
							let container = document.querySelector('.words');
							scrollIntoViewX(container, scrollEl, {behavior: 'auto', align: 'center'});
						}catch(e){
							console.log('Ошибка показа');
						}
					}, 100);

					setTimeout(()=>{
						this.wordWasIndex = -1;
					}, 1200)

				}else{
					if(this.isSounds){
						if(this.lastSounds){
							wrongWordSound2.play();
						}else{
							wrongWordSound.play();
						}
					}

					try{
						let isWhyBadWord = whyBadWord(this.wordFromLetter);
						if(isWhyBadWord){
							this.showWhyBadWord = true;
							this.textWhyBadWord = isWhyBadWord;
						}
					}catch(e){
						console.log(e);
					}

				}



				if(this.wordFromLetter === this.fixedWord || this.wordFromLetter === this.word){
					this.showBigWordWas = true;
				}

				setTimeout(()=>{
					this.isBadWord = false;
					this.wordFromLetter = '';
					this.selectedLetters = [];
				}, 400)
			}

		},
		startOver(){
			this.verticalPayload = false;
			allDoneWords = {};
			PLAYESTATE = {allDoneWords: {}};
			tips = 10;
			PLAYERSTATS = {'tips': 10};
			showNextPayloadTutorial = false;
			lastLevel = 0;
			this.updateAll();
			saveAllData();
			this.getLevel(0, true);
			this.togglePayloadInfo();
			params({'vertPayloadStartOver': 1});
		},
		continueThere(){
			this.verticalPayload = false;
			this.togglePayloadInfo();
			params({'vertPayloadContinue': 1});
		},
		togglePayloadInfo(){
			this.isPayloadInfo = !this.isPayloadInfo;
		},
		testStars(){
			let stars = testStar(this.doneWords.length, this.nowWords.length);
			if(stars > this.levelStars){

				this.bgShowen = false;
				this.getStar = stars;
				this.levelStars = stars;
				if(this.isMyGame){
					if(stars === 1){
						// params({'endMyGame': 1});
					}
				} else if(this.locationGame){
					this.locationStars.splice(this.lvl, 1, stars);

					if(this.lvl === 19 && stars === 1){
						params({['endLoc-' + this.gameLocation]: 1});
					}
					if(this.eventLocation){
						this.addPlayerToLB(true);
					}else{
						if(this.locationAllStars === 20
							|| this.locationAllStars === 40 || this.locationAllStars === 60) {

							this.showLastLevelInfo = true;
							this.tipCount += this.locationAllStars / 2;
							this.howManyTips = this.locationAllStars / 2;
							setToStorage('tips', this.tipCount);
							PLAYERSTATS.tips = this.tipCount;
							saveAllData(true);
						}
					}
				}else{
					setLastLevel();
					if(stars === 1){
						if(this.lvl < 20){
							params({'doneLevel': this.lvl});
							if(this.lvl === 0){
								tutorialStep = 50;
								this.cloudHint = true;
								this.cloudsPhrase = infoAboutEndFirstLevel;
								if(skipNewTutorial){
									params({'doneLevelSkip': 1});
								}
							}
						}


						let thisLvl = this.lvl+1;
						if(thisLvl === 2 || thisLvl === 10 || thisLvl === 5 ||
							thisLvl === 20 || thisLvl === 50 || thisLvl === 100){
							reachGoal('level' + thisLvl);
						}
					}
					this.gameLastLevel = lastLevel;
					this.stars.splice(this.lvl, 1, stars);
					// if(this.lvl < 10){
					// 	let lvlParams = 'endLevel-' + this.lvl;
					// 	params({[lvlParams]: stars});
					// }
					this.addPlayerToLB(true);
					saveAllData(true);
				}
				if(this.isSounds){
					starVolume.play();
				}
				setTimeout(()=>{
					this.getStar = -1;
					if(this.isMyGame) return;
					if(stars === 3){
						if(this.notRussian) this.tipCount++;
						else this.tipCount += 2;
						if(!this.isMyGame){
							this.getEndGame()
						}
					}else if(stars === 2){
						//Для малышей больше подсказок
						if(this.lvl < 20){
							this.tipCount += 2;
						}else{
							this.tipCount++;
						}
					} else{
						this.tipCount++;
					}


					/*if(this.verticalPayload){
						this.togglePayloadInfo();
					}*/

					setToStorage('tips', this.tipCount);
					PLAYERSTATS.tips = this.tipCount;
					saveAllData(false);
				}, 1000);
				return true;
			}
			return false;

		},
		addWord(word){
			this.doneWords.push(word);
		},
		openLastLevel(){
			try{
				this.getLevel(lastLevel, true);
			}catch(ignored){};
		},
		eraseWord(){
			// params({'erase': 1});
			this.wordFromLetter = '';
			this.selectedLetters = [];
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			if (doDeleteBlock) {
				deletePreDownload();
				if(isRules && !payloadLevel){
					this.openLastLevel();
					this.startTutorial();
				}else if(window.innerHeight > window.innerWidth){
					// this.toggleShowInfoAboutPortrait();
				}
				this.tryOpenPayloadLevel();
			}
			this.getRandomStars();
			document.addEventListener('keydown', this.pressKey);
			console.log('Вызов баннера при заходе');
			// this.getPromoResult();
			// getBanner();
			addSwipeTo(this.nextLocation, this.prevLocation, true);
			addSwipeTo(this.eraseWord, this.eraseWord, false);
		})
	}
}
</script>
<style>

</style>
