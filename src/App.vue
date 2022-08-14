<template>
	<div id="app" :class="['chosenAppBg' + chosenBgRight, showGameLocation ? 'locationOpened' : '', 'gameLocationWrapper-' + gameLocation]">
		<!--    <div class="close-level-help prev-location next-location"></div>-->
		<div class="levels"
			 @updateAll="updateAll()"
			 @canShowAdv="setCanShowAdv()"
			 @buyTips="addBuyTips()"
			 v-show="levels" :class="[levelsAnim ? 'levelsAnim' : '']">

			<div class="snowAnimation"></div>

<!--			<div class="blur"></div>-->





			<div class="levels__property">
				<div class="levelsTop">
<!--					<div class="eventIcon-wrapper" @click="getEventLocation" v-if="!notRussian"><div class="eventIcon"></div></div>-->
					<div
						class="levelsTop__allStars"
						:class="[notRussian ? 'levelsTop__allStars_withoutLB' : '']"
						@click="toggleShowInfoAboutStars"
					>
						{{allStars}}/{{ (location+1)*(lvlsOnPage*3)}}
						<svg class="svgIcon" width="18" height="17" viewBox="0 0 18 17" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M8.52447 0.463525C8.67415 0.00287008 9.32585 0.00287008 9.47553 0.463525L11.1329 5.56434C11.1998 5.77035 11.3918 5.90983 11.6084 5.90983H16.9717C17.4561 5.90983 17.6575 6.52964 17.2656 6.81434L12.9266 9.96681C12.7514 10.0941 12.678 10.3198 12.745 10.5258L14.4023 15.6266C14.552 16.0873 14.0248 16.4704 13.6329 16.1857L9.29389 13.0332C9.11865 12.9059 8.88135 12.9059 8.70611 13.0332L4.3671 16.1857C3.97524 16.4704 3.448 16.0873 3.59768 15.6266L5.25503 10.5258C5.32197 10.3198 5.24864 10.0941 5.07339 9.96681L0.734384 6.81434C0.342527 6.52964 0.543915 5.90983 1.02828 5.90983H6.39159C6.6082 5.90983 6.80018 5.77035 6.86712 5.56434L8.52447 0.463525Z"/></svg>

						<!--					<div class="menu-star"></div>-->
					</div>
				</div>

				<div class="levels-wrapper" :class="{'levels-wrapper_bigLevels': location*lvlsOnPage >= 1000}">
					<div
						class="level"
						v-for="level in lvlsOnPage"
						:key="getLevelByLevelAndLocation(level)"
						@click="getLevel(getLevelByLevelAndLocation(level)-1, false, true)"
						:class="{'level-done': isLevelDone(getLevelByLevelAndLocation(level)),
                            'level_close': isCloseLevelShow(getLevelByLevelAndLocation(level))
                            }">




						<div :class="getLevelByLevelAndLocation(level) > 99 ? 'level__big' : ''">
							{{getLevelByLevelAndLocation(level)}}</div>
						<div class="menu__level_stars">
							<div class="level_star" v-for="star in 3" :key="star"
								 :class="star <= stars[getLevelByLevelAndLocation(level)-1] ? 'menu-star' : ''"></div>
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
					<svg class="svgIcon" width="22" height="18" viewBox="0 0 22 18" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M5.80626 0.657311C5.80626 0.294288 6.10055 0 6.46357 0H14.601C14.964 0 15.2583 0.294288 15.2583 0.657311V16.7614C15.2583 17.1245 14.964 17.4188 14.601 17.4188H6.46357C6.10055 17.4188 5.80626 17.1245 5.80626 16.7614V0.657311Z"/><path d="M16.8786 9.70424C16.8786 9.34122 17.1729 9.04693 17.5359 9.04693H20.9473C21.3104 9.04693 21.6047 9.34122 21.6047 9.70424V16.7614C21.6047 17.1244 21.3104 17.4187 20.9473 17.4187H17.5359C17.1729 17.4187 16.8786 17.1244 16.8786 16.7614V9.70424Z"/><path d="M0 5.38332C0 5.0203 0.294288 4.72601 0.657311 4.72601H3.52859C3.89161 4.72601 4.1859 5.0203 4.1859 5.38332V16.7614C4.1859 17.1245 3.89161 17.4187 3.52859 17.4187H0.657312C0.294289 17.4187 0 17.1245 0 16.7614V5.38332Z"/><path d="M10.7837 1.77475L11.3749 3.59415H13.2879L11.7403 4.71861L12.3314 6.53801L10.7837 5.41356L9.23605 6.53801L9.82721 4.71861L8.27954 3.59415H10.1926L10.7837 1.77475Z" fill="white"/></svg>
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
					:class="loc + 'Location'"
					@click="openGameLocation(loc)"
				>
					<div class="popUp__locationPicture">
						<div class="popUp__locationStars">
							{{getLocationAllStarsByLocation(loc)}}/{{loc === 'event' ? eventLocationWordsAMount*3 : 60}}
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
				Позже вы сможете перемещаться по страницам, используя это окно
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
				Создание уровня
			</h2>
			<div class="gameWordMistake">
				<span v-show="gameWordMistake">Пожалуйста, введите слово от 4 до 12 букв в русской раскладке</span>
			</div>
			<input
				class="createLevelInput"
				v-model="gameWord"
				type="text"
				placeholder="Введите своё слово"
			/>
			<div class="startCreateGame" @click="startCreateGame(false)">Создать игру</div>
			<div class="startCreateGame" @click="startCreateGame(true)" v-show="savedMyGame">Продолжить</div>

		</div>

		<div class="rules-blackout blackoutInfoCreateGame" v-if="isInfoAboutCreateGame" @click="toggleIsInfoAboutCreateGame"></div>

		<div class="rules infoCreateGame" v-if="isInfoAboutCreateGame">
			<cross-vue @click.native="toggleIsInfoAboutCreateGame()" ></cross-vue>
			<h2 class="rules__menu">
				Описание
			</h2>
			<p>Здесь Вы можете создать свой уровень из любого слова, которое придумаете.
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
						:class="['leaderBoardInfo_' + player.rank, playerRait && playerRait.rank === player.rank ? 'leaderBoardInfo_my' : '', player.rank === 20 ? 'lastRang' : '']"
					>
						<div class="leaderBoardInfo__rank">{{ player.rank }}</div>
						<div class="leaderBoardInfo__playerInfo">
							<div class="leaderBoardInfo__image"
								 :style="{background: 'url(' + player.player.getAvatarSrc('medium') + ') center center no-repeat'}"
								 :class="[player.player.getAvatarSrc('medium') ? '' : 'leaderBoardInfo__image_no']"></div>
							<div class="leaderBoardInfo__name">{{ player.player.publicName ? player.player.publicName : 'Нет имени' }}</div>
							<div class="leaderBoardInfo__score">{{ player.score }}</div>
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



		<!--Блок с локацией-->
		<div
			class="location"
			:class="[
				'gameLocation-' + gameLocation,
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
							 :class="star <= locationStars[level-1] ? 'menu-star' : ''"></div>
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








		<div class="game" v-show="content">
			<div class="blur"></div>

			<header class="menu" :class="[isTutorial ? 'tutorialMenu' : '', verticalPayload ? 'menu_verticalPayload': '']">
				<button
					class="menu__button-back menuItem"
					@click="backMenu"
					v-show="!verticalPayload"
				>
					<svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.6255 0.700921C9.6294 0.704508 9.6354 0.704507 9.6393 0.700921L10.0169 0.353633C10.2342 0.153729 10.5685 0.153729 10.7858 0.353633L19.786 8.63225C20.2443 9.05379 20.2443 9.77702 19.786 10.1986C19.5266 10.4372 19.1783 10.5238 18.8543 10.4584V19C18.8543 20.1046 17.9589 21 16.8543 21H13V15.5C13 14.1193 11.8807 13 10.5 13C9.11927 13 7.99999 14.1193 7.99999 15.5V21H3.80269C2.69812 21 1.80269 20.1046 1.80269 19V10.5808C1.47324 10.6538 1.11605 10.5686 0.851402 10.3251C0.39312 9.9036 0.39312 9.18037 0.851402 8.75883L9.46756 0.833511L9.4759 0.82223L9.4779 0.824005L9.61171 0.700921C9.61561 0.697335 9.6216 0.697335 9.6255 0.700921Z"/></svg>
				</button>
				<div
					class="menu__words-amount"
					v-show="!verticalPayload"
				>
					{{doneWords.length}}/{{nowWords.length}}
					<div class="menu__hint">{{notRussian ? 'Guessed' : 'Отгадано'}}</div>
				</div>
				<div class="menu__level">
					{{notRussian ? 'Level' : 'Уровень'}} {{lvl+1}}
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

					<div class="advert" v-if="tipCount === 0 && advTimer <= 0"></div>
					<div class="menu__tip_count" v-else>
						<template v-if="advTimer > 0 && tipCount === 0">
							{{advTimerTime}}
						</template>
						<template v-else>
							{{lvl === 0 && !locationGame ? '∞' : tipCount}}
						</template>

					</div>
				</div>
				<div class="menu__button-next-level menuItem"
					 :class="[!testShowNextLevel() ? 'menu__button-next-level_notActive' : 'menu__button-next-level_active']"
					 @click="nextLevel()"
					 v-show="!verticalPayload"
				>
					<svg class="svgIcon" width="13" height="22" viewBox="0 0 13 22" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.58569 0.58569C-0.195229 1.36661 -0.19523 2.63273 0.585689 3.41365L7.73631 10.5643L0.634992 17.6656C-0.145916 18.4465 -0.145916 19.7126 0.634992 20.4935C1.4159 21.2744 2.682 21.2744 3.46291 20.4935L11.9696 11.9868C12.7507 11.2057 12.7507 9.93941 11.9696 9.15836L11.4339 8.62262C11.3887 8.56636 11.3399 8.51197 11.2877 8.45975L3.41365 0.585689C2.63273 -0.19523 1.36661 -0.19523 0.58569 0.58569Z"/></svg>


					<div class="menu__hint" v-if="lvl < 4">{{notRussian ? 'Earn 1 star and get access to the next level' : 'Заработайте 1 звезду и получите доступ к следующему уровню'}}</div>
				</div>
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

				</div>





				<div class="action-block">
					<div class="action-block__done-word" @dblclick="eraseWord">
						<div class="done-word" :class="[isBadWord ? 'badWord' : '']" >{{wordFromLetter}}</div>
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
						<button class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord"></button>
					</div>
				</div>


				<div class="cloudHint" v-show="cloudHint && !showWordDesc" :class="[selectMainWord ? 'cloudHint_wordSelected' : '']" @click="closeHint()">
					<p v-html="cloudsPhrase"></p>
				</div>
				<div class="skipTutorial" v-show="cloudHint && !showWordDesc && canShowSkip" @click="skipTutorial">Пропустить</div>


				<div class="bottomMenu">

					<div class="menu__tip menuItem" @click="getTip()" :class="[selectTip ? 'tutorialSelected' : '']">
						<svg class="svgIcon" width="15" height="23" viewBox="0 0 15 23" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M8.80952 22.0417C8.70168 22.5783 8.16247 23 7.5 23C6.83754 23 6.29832 22.5783 6.19048 22.0417H8.80952Z" /><path d="M9.66096 20.2853L5.24123 20.2725C5.22789 20.2736 5.21455 20.2747 5.18787 20.2769C5.07895 20.2589 4.97789 20.1726 4.96802 20.0518C4.95815 19.931 5.03051 19.8304 5.14838 19.7936C5.16172 19.7925 5.17507 19.7914 5.20175 19.7892L9.60813 19.8031C9.74154 19.7921 9.85703 19.8906 9.868 20.0249C9.87897 20.1591 9.79436 20.2742 9.66096 20.2853Z" /><path d="M5.15316 20.9796C5.16639 20.9785 5.17962 20.9774 5.20607 20.9753L9.57506 20.9922C9.70732 20.9813 9.82191 21.0799 9.83288 21.2142C9.84384 21.3484 9.74681 21.4645 9.61454 21.4755L5.23233 21.4596C5.2191 21.4607 5.20587 21.4618 5.17942 21.464C5.07141 21.4459 4.97115 21.3596 4.96128 21.2388C4.95141 21.118 5.03522 21.0029 5.15316 20.9796Z" /><path d="M5.27194 18.2083H9.72806C10.0099 18.2083 10.2381 18.4227 10.2381 18.6875C10.2381 18.9523 10.0099 19.1667 9.72806 19.1667H5.27194C4.99008 19.1667 4.76191 18.9523 4.76191 18.6875C4.76191 18.4227 4.99008 18.2083 5.27194 18.2083Z" /><path d="M7.4599 0C7.4733 0 7.4733 0 7.48669 0C7.50008 0 7.50008 0 7.51347 0C11.6518 0 15 3.40946 15 7.62354C15 10.5829 13.192 12.8332 11.1295 14.7425C10.3126 15.5062 9.83041 16.5972 9.83041 17.7292H7.52687C7.52687 17.7292 7.51347 17.7292 7.50008 17.7292C7.48669 17.7292 7.47329 17.7292 7.47329 17.7292H5.16975C5.16975 16.5836 4.68761 15.4926 3.87066 14.7425C1.80818 12.8332 0.000160217 10.5966 0.000160217 7.62354C-0.0266256 3.42309 3.32156 0 7.4599 0Z" /></svg>
						<div class="advert" v-if="tipCount === 0 && advTimer <= 0"></div>
						<div class="menu__tip_count" v-else>
							<template v-if="advTimer > 0 && tipCount === 0">
								{{advTimerTime}}
							</template>
							<template v-else>
								{{lvl === 0 && !locationGame ? '∞' : tipCount}}
							</template>

						</div>
					</div>



					<div class="menu__words-amount">
						{{doneWords.length}}/{{nowWords.length}}
						<div class="menu__hint">{{notRussian ? 'Guessed' : 'Отгадано'}}</div>
					</div>

					<button class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord"></button>

				</div>

				<div class="bannerForVertical">
					<div class="container-lbInGame" v-if="lbInGame">
						<div class="lbInGame">
							<div
								class="lbInGame__player"
								v-for="player in lbInGame"
								:class="[
									playerRait && playerRait.player.uniqueID === player.player.uniqueID ? 'leaderBoardInfo_my' : ''
								 ]"
								:style="{background: 'url(' + player.player.getAvatarSrc('medium') + ') center center no-repeat, whitesmoke'}"
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

			<div class="blackout cloudHintBackground" v-show="cloudHint" @click="closeHint()"></div>



			<div class="rules-blackout" v-show="showWordDesc" @click="toggleShowWordDesc"></div>

			<div class="rules word-mean bigRules" v-show="showWordDesc">
				<cross-vue @click.native="toggleShowWordDesc()" ></cross-vue>
				<h2 class="rules__menu">
					{{notRussian ? 'Definition' : 'Определение слова'}}
				</h2>
				<div class="word-definition">
					{{notRussian ? 'Definition - loading...' : 'Определение слова - загрузка...'}}
				</div>
				<iframe src="https://ru.m.wiktionary.org/wiki/" id="definitionIframe" v-show="!notRussian"></iframe>

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
					На "Фестивале Слов" подсказки отключены, вводить слова можно только вручную
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



		</div>



		<div class="blurBackground" v-if="shop" @click="toggleShop"></div>


		<div class="popUp shopPopUp" v-if="shop">
			<div class="popUp__header">
				<div class="popUp__title">{{notRussian ? 'Shop' : 'Магазин'}}</div>
				<div class="popUp__close" @click="toggleShop"></div>
			</div>
			<div class="popUp__elements">

					<div class="shop__cart__item" @click="buyTip(2)">
						<div class="shop__cart__card">
							<div class="shop__cart__item_2">
								<svg class="svgIcon" fill="#66196C" width="63" height="96" viewBox="0 0 63 96" xmlns="http://www.w3.org/2000/svg"><path d="M26 92C26.4529 94.24 28.7176 96 31.5 96C34.2824 96 36.5471 94.24 37 92H26Z" /><path d="M22.424 84.6689L40.9868 84.6156C41.0429 84.6202 41.0989 84.6248 41.211 84.634C41.6684 84.5588 42.0929 84.1988 42.1343 83.6946C42.1758 83.1903 41.8718 82.7704 41.3768 82.6169C41.3208 82.6123 41.2647 82.6077 41.1527 82.5985L22.6458 82.6564C22.0855 82.6103 21.6005 83.0217 21.5544 83.582C21.5083 84.1423 21.8637 84.6228 22.424 84.6689Z" /><path d="M41.3567 87.5672C41.3012 87.5626 41.2456 87.558 41.1345 87.5489L22.7848 87.6197C22.2293 87.574 21.748 87.9857 21.7019 88.546C21.6559 89.1063 22.0634 89.5911 22.6189 89.6368L41.0242 89.5705C41.0798 89.5751 41.1353 89.5797 41.2464 89.5888C41.7001 89.5133 42.1212 89.153 42.1626 88.6488C42.2041 88.1445 41.8521 87.6643 41.3567 87.5672Z" /><path d="M40.8578 76H22.1422C20.9583 76 20 76.8947 20 78C20 79.1053 20.9583 80 22.1422 80H40.8578C42.0417 80 43 79.1053 43 78C43 76.8947 42.0417 76 40.8578 76Z" /><path d="M31.6684 0C31.6122 0 31.6122 0 31.5559 0C31.4997 0 31.4997 0 31.4434 0C14.0623 0 0 14.2308 0 31.82C0 44.1723 7.59367 53.5646 16.2561 61.5338C19.6873 64.7215 21.7123 69.2754 21.7123 74H31.3872C31.3872 74 31.4434 74 31.4997 74C31.5559 74 31.6122 74 31.6122 74H41.2871C41.2871 69.2185 43.312 64.6646 46.7432 61.5338C55.4057 53.5646 62.9993 44.2292 62.9993 31.82C63.1118 14.2877 49.0495 0 31.6684 0Z" /></svg>
							</div>
							<div class="shop__cart__name">{{notRussian ? '20 hints' : '20 подсказок'}}</div>
						</div>
						<div class="shop__cart__buy-button" >
							<!--						<div class="shop__lastPrice">49</div>-->
							{{getItemPrice(0)}}
						</div>
					</div>


					<div class="shop__cart__item" @click="buyTip(3)">
						<div class="shop__cart__card">
							<div class="shop__cart__item_3">
								<svg class="svgIcon" fill="#66196C" width="93" height="96" viewBox="0 0 93 96" xmlns="http://www.w3.org/2000/svg"><path d="M56 92C56.4529 94.24 58.7176 96 61.5 96C64.2823 96 66.5471 94.24 67 92H56Z" /><path d="M52.424 84.6689L70.9868 84.6156C71.0429 84.6202 71.0989 84.6248 71.211 84.634C71.6684 84.5588 72.0929 84.1988 72.1343 83.6946C72.1758 83.1903 71.8718 82.7704 71.3768 82.6169C71.3208 82.6123 71.2647 82.6077 71.1527 82.5985L52.6458 82.6564C52.0855 82.6103 51.6005 83.0217 51.5544 83.582C51.5083 84.1423 51.8637 84.6228 52.424 84.6689Z" /><path d="M71.3567 87.5672C71.3012 87.5626 71.2456 87.558 71.1345 87.5489L52.7848 87.6197C52.2293 87.574 51.748 87.9857 51.7019 88.546C51.6559 89.1063 52.0634 89.5911 52.6189 89.6368L71.0242 89.5705C71.0798 89.5751 71.1353 89.5797 71.2464 89.5888C71.7001 89.5133 72.1212 89.153 72.1626 88.6488C72.2041 88.1445 71.8521 87.6643 71.3567 87.5672Z" /><path d="M70.8578 76H52.1422C50.9583 76 50 76.8947 50 78C50 79.1053 50.9583 80 52.1422 80H70.8578C72.0417 80 73 79.1053 73 78C73 76.8947 72.0417 76 70.8578 76Z" /><path d="M61.6684 0C61.6122 0 61.6122 0 61.5559 0C61.4997 0 61.4997 0 61.4434 0C44.0623 0 30 14.2308 30 31.82C30 44.1723 37.5937 53.5646 46.2561 61.5338C49.6873 64.7215 51.7123 69.2754 51.7123 74H61.3872C61.3872 74 61.4434 74 61.4997 74C61.5559 74 61.6122 74 61.6122 74H71.2871C71.2871 69.2185 73.312 64.6646 76.7432 61.5338C85.4057 53.5646 92.9993 44.2292 92.9993 31.82C93.1118 14.2877 79.0495 0 61.6684 0Z" /><path d="M6.99895 92.1386C7.25955 93.181 8.56255 94 10.1634 94C11.7642 94 13.0672 93.181 13.3278 92.1386H6.99895Z" /><path d="M1.53153 87.2486L18.9484 87.2014C18.9856 87.2035 19.0227 87.2056 19.0971 87.2099C19.3987 87.1526 19.6737 86.9073 19.6929 86.5728C19.712 86.2383 19.5039 85.9653 19.1737 85.8719C19.1365 85.8697 19.0993 85.8676 19.025 85.8633L7.77057 85.7412L1.64529 85.9127C1.27361 85.8914 0.959247 86.1717 0.937973 86.5434C0.9167 86.9151 1.15985 87.2273 1.53153 87.2486Z" /><path d="M18.9445 89.2148C18.9074 89.2127 18.8702 89.2105 18.7959 89.2063L7.54143 89.0842L1.41613 89.2556C1.04446 89.2344 0.730102 89.5147 0.708828 89.8864C0.687555 90.258 0.967873 90.5724 1.33955 90.5937L18.7564 90.5464C18.7936 90.5486 18.8308 90.5507 18.9051 90.555C19.2067 90.4976 19.4818 90.2524 19.5009 89.9178C19.5201 89.5833 19.2769 89.2711 18.9445 89.2148Z" /><path d="M18.9121 81.1561H1.41469C0.632886 81.1561 0 81.789 0 82.5708C0 83.3526 0.632886 83.9855 1.41469 83.9855H18.9121C19.6939 83.9855 20.3268 83.3526 20.3268 82.5708C20.3268 81.789 19.6939 81.1561 18.9121 81.1561Z" /><path d="M19.4705 79.2203V28.1799C19.4705 24.7549 16.6784 22 13.2906 22H7.11067C3.68564 22 0.930727 24.7921 0.930727 28.1799V79.2203H19.4705Z" /></svg>

							</div>
							<div class="shop__cart__name">{{notRussian ? '50 hints' : '50 подсказок'}}</div>
						</div>
						<div class="shop__cart__buy-button">
							<!--						<div class="shop__lastPrice">99</div>-->
							{{getItemPrice(1)}}
						</div>
					</div>


					<div class="shop__cart__item" @click="buyTip(4)">
						<div class="shop__cart__card">
							<div class="shop__cart__item_4">
								<svg class="svgIcon" fill="#66196C" width="128" height="100" viewBox="0 0 128 100" xmlns="http://www.w3.org/2000/svg"><path d="M122.536 84.2581H108.464C107.444 84.2581 106.599 85.1025 106.599 86.1227V88.3743C106.599 89.3946 107.444 90.2389 108.464 90.2389H122.536C123.556 90.2389 124.401 89.3946 124.401 88.3743V86.1227C124.401 85.1025 123.592 84.2581 122.536 84.2581Z" /><path d="M118.842 33.1047C118.49 32.0845 117.963 31.3457 117.47 30.818C116.415 29.7273 114.62 29.7273 113.53 30.818C113.037 31.3457 112.51 32.0845 112.158 33.1047C111.102 36.0951 102.659 50.3435 103.011 60.1942C103.363 70.045 108.464 73.2113 108.464 77.6089C108.464 79.4735 108.464 80.9159 108.464 82.3935H122.536C122.536 80.9511 122.536 79.4735 122.536 77.6089C122.536 73.2113 127.637 70.045 127.989 60.1942C128.341 50.3435 119.898 36.0951 118.842 33.1047Z" /><path d="M112.51 98.0843C112.756 99.0694 113.987 99.8434 115.5 99.8434C117.013 99.8434 118.244 99.0694 118.49 98.0843H112.51Z" /><path d="M109.786 93.4911L121.402 93.4577C121.437 93.4606 121.472 93.4635 121.543 93.4692C121.829 93.4222 122.094 93.1969 122.12 92.8814C122.146 92.5658 121.956 92.3031 121.646 92.207C121.611 92.2041 121.576 92.2012 121.506 92.1954L109.925 92.2317C109.574 92.2029 109.271 92.4603 109.242 92.8109C109.213 93.1616 109.435 93.4622 109.786 93.4911Z" /><path d="M121.39 95.3276C121.355 95.3247 121.32 95.3218 121.25 95.316L109.668 95.3523C109.318 95.3234 109.014 95.5809 108.985 95.9315C108.956 96.2821 109.214 96.5857 109.564 96.6145L121.181 96.5812C121.216 96.5841 121.251 96.5869 121.321 96.5927C121.607 96.5456 121.873 96.3204 121.899 96.0048C121.925 95.6892 121.665 95.4207 121.39 95.3276Z" /><path d="M57 92C57.4529 94.24 59.7176 96 62.5 96C65.2823 96 67.5471 94.24 68 92H57Z" /><path d="M53.424 84.6689L71.9868 84.6156C72.0429 84.6202 72.0989 84.6248 72.211 84.634C72.6684 84.5588 73.0929 84.1988 73.1343 83.6946C73.1758 83.1903 72.8718 82.7704 72.3768 82.6169C72.3208 82.6123 72.2647 82.6077 72.1527 82.5985L53.6458 82.6564C53.0855 82.6103 52.6005 83.0217 52.5544 83.582C52.5083 84.1423 52.8637 84.6228 53.424 84.6689Z" /><path d="M72.3567 87.5672C72.3012 87.5626 72.2456 87.558 72.1345 87.5489L53.7848 87.6197C53.2293 87.574 52.748 87.9857 52.7019 88.546C52.6559 89.1063 53.0634 89.5911 53.6189 89.6368L72.0242 89.5705C72.0798 89.5751 72.1353 89.5797 72.2464 89.5888C72.7001 89.5133 73.1212 89.153 73.1626 88.6488C73.2041 88.1445 72.8521 87.6643 72.3567 87.5672Z" /><path d="M71.8578 76H53.1422C51.9583 76 51 76.8947 51 78C51 79.1053 51.9583 80 53.1422 80H71.8578C73.0417 80 74 79.1053 74 78C74 76.8947 73.0417 76 71.8578 76Z" /><path d="M62.6684 0C62.6122 0 62.6122 0 62.5559 0C62.4997 0 62.4997 0 62.4434 0C45.0623 0 31 14.2308 31 31.82C31 44.1723 38.5937 53.5646 47.2561 61.5338C50.6873 64.7215 52.7123 69.2754 52.7123 74H62.3872C62.3872 74 62.4434 74 62.4997 74C62.5559 74 62.6122 74 62.6122 74H72.2871C72.2871 69.2185 74.312 64.6646 77.7432 61.5338C86.4057 53.5646 93.9993 44.2292 93.9993 31.82C94.1118 14.2877 80.0495 0 62.6684 0Z" /><path d="M6.99895 95.1386C7.25955 96.181 8.56255 97 10.1634 97C11.7642 97 13.0672 96.181 13.3278 95.1386H6.99895Z" /><path d="M1.53365 90.2299L18.9506 90.2202C18.9878 90.2224 19.0249 90.2246 19.0992 90.229C19.401 90.1723 19.6766 89.9277 19.6964 89.5932C19.7163 89.2587 19.5088 88.9854 19.1787 88.8912C19.1415 88.8889 19.1044 88.8867 19.0301 88.8823L7.77591 88.736L1.65028 88.8943C1.27865 88.8722 0.963683 89.1519 0.94161 89.5235C0.919537 89.8951 1.16202 90.2079 1.53365 90.2299Z" /><path d="M18.9424 92.2336C18.9052 92.2314 18.868 92.2292 18.7937 92.2248L7.53958 92.0784L1.41394 92.2367C1.04231 92.2147 0.72735 92.4943 0.705277 92.8659C0.683204 93.2376 0.962846 93.5525 1.33448 93.5746L18.7514 93.5648C18.7886 93.567 18.8258 93.5692 18.9001 93.5737C19.2018 93.517 19.4774 93.2723 19.4973 92.9378C19.5171 92.6034 19.2746 92.2906 18.9424 92.2336Z" /><path d="M18.9121 84.1561H1.41469C0.632886 84.1561 0 84.789 0 85.5708C0 86.3526 0.632886 86.9855 1.41469 86.9855H18.9121C19.6939 86.9855 20.3268 86.3526 20.3268 85.5708C20.3268 84.789 19.6939 84.1561 18.9121 84.1561Z" /><path d="M19.4705 82.2203V31.1799C19.4705 27.7549 16.6784 25 13.2906 25H7.11067C3.68564 25 0.930727 27.7921 0.930727 31.1799V82.2203H19.4705Z" /></svg>

							</div>
							<div class="shop__cart__name">{{notRussian ? '100 hints' : '100 подсказок'}}</div>
						</div>
						<div class="shop__cart__buy-button">
							<!--						<div class="shop__lastPrice">149</div>-->
							{{getItemPrice(2)}}
						</div>
					</div>



			</div>


		</div>

		<div class="rules-blackout main-blackout" v-if="purchaseCompleted" @click="togglePurchaseCompleted()"></div>

		<div class="rules rules__notification" v-if="purchaseCompleted">
			<cross-vue @click.native="togglePurchaseCompleted()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Successful purchase' : 'Покупка совершена'}}
			</h2>
			{{notRussian ? 'Hints are credited to your account. Thank you for your purchase! Have a good game!' : 'Вы успешно купили подсказки, они уже зачислены на ваш счёт! Большое спасибо за покупку и удачной Вам игры!'}}
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
						<a href="https://vk.com/jaugr"
						   target="_blank"
						   rel="noopener noreferrer"
						   class="settings__text"
						   @click="()=>{sendParams({'vk': 1})}"
						>
							Группа ВКонтакте
						</a>
					</li>

<!--					<li class='our-games'>-->
<!--						Наши игры-->
<!--					</li>-->

<!--					<li @click="()=>{sendParams({'crs': 1})}">-->
<!--						<a href="https://yandex.ru/games/play/100008"-->
<!--						   target="_blank"-->
<!--						   rel="noopener noreferrer"-->
<!--						>-->
<!--							<div class="my-game crs">-->
<!--							</div>-->
<!--						</a>-->
<!--					</li>-->

<!--					<li @click="()=>{sendParams({'stm': 1})}">-->
<!--						<a href="https://yandex.ru/games/play/98125"-->
<!--						   target="_blank"-->
<!--						   rel="noopener noreferrer"-->
<!--						>-->
<!--							<div class="my-game stm">-->
<!--							</div>-->
<!--						</a>-->
<!--					</li>-->

<!--					<li @click="()=>{sendParams({'wfl': 1})}">-->
<!--						<a href="https://yandex.ru/games/play/99196"-->
<!--						   target="_blank"-->
<!--						   rel="noopener noreferrer"-->
<!--						>-->
<!--							<div class="my-game wfl">-->
<!--							</div>-->
<!--						</a>-->
<!--					</li>-->
				</template>


			</ul>
		</div>

		<div class="rules-blackout main-blackout" v-if="showLastLevelInfo && !notRussian" @click="toggleShowLastLevelInfo()"></div>
		<div class="rules rules__notification" v-if="showLastLevelInfo && !notRussian">
			<cross-vue @click.native="toggleShowLastLevelInfo()"></cross-vue>
			<h2 class="rules__menu">
				{{locationGame ? 'Ура!' : wasUpdate ? 'Фестиваль слов' : 'Дорогой игрок!'}}
			</h2>
			<template v-if="locationGame">
				Поздравляем! Вы заработали {{howManyTips*2}} звёзд в локации "{{getLocationName(gameLocation)}}"!
				За это мы дарим вам дополнительные {{howManyTips}} подсказок. Удачной игры!
			</template>
			<template v-else-if="wasUpdate">
				Начался Фестиваль Слов! Проходите уровни, зарабатывайте очки и боритесь за подарки!
				Главный приз -  Яндекс.Станция!
				<div class="rules__goBg" @click="getEventLocation()">Перейти</div>
			</template>
			<template v-else>
				Поздравляем! Вы прошли все уровни игры! Но не отчаивайтесь, скоро обязательно появятся новые. Мы добавляем новые уровни каждый месяц.
				Вы можете пройти все старые уровни на 3 звезды (если ещё не прошли) или же подождать, когда выйдут новые уровни. Про обновления вы можете узнать в
				<a href="https://vk.com/jaugr"
				   target="_blank"
				   rel="noopener noreferrer"
				   class="settings__text"
				   @click="()=>{sendParams({'vk-lastLevel': 1})}"
				>
					группе ВКонтакте
				</a>.
			</template>

		</div>



		<div class="rules-blackout main-blackout" v-show="rules" @click="toggleRules()"></div>
		<div class="rules" v-show="rules">
			<cross-vue @click.native="toggleRules()"></cross-vue>
			<h2 class="rules__menu">
				{{notRussian ? 'Rules' : eventLocation ? 'Фестиваль Слов' : 'Правила'}}
			</h2>

			<template v-if="eventLocation">
				<div class="	eventLocationText">
					Вместе с платформой Яндекс.Игры мы проводим розыгрыш
					<span @click="toggleIsEventResult" class="prizesText">500 призов</span>, главный из которых - умная колонка «Яндекс Станция Мини» 🏆<br>
					Для участия в розыгрыше необходимо:
					<ul>
						<li>
							Авторизоваться на платформе Яндекс.Игры 🎮
						</li>
						<li>
							Проходить специальные уровни Фестиваля Слов ⚡
						</li>
						<li>
							Получать очки за отгаданные слова (слово из 2 букв приносит 2 очка, из 5 букв - 5 очков) 🎁
						</li>
					</ul>
					<p class="fullRules"><a href="https://disk.yandex.ru/i/KBsfQXcVNBpCbw" target="_blank">Полные условия</a></p>
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
					<img v-bind:src="!notRussian ? 'rules1.png' : 'rules1EN.png'" alt="Пример слова">
					<p>
						{{notRussian ?
						'Use hints to add words that you can\'t find. Hints can be obtained by earning stars. Level progress is 33% - 1 star, 66% - 2 stars, 100% -3 stars. Get at least 1 star and click on the arrow in the upper right corner to go to the next level.' :
						'Если у вас закончились идеи, используйте подсказку (она нарисована как лампочка). Подсказки можно получить за звёзды. Уровень пройден на 33% - 1 звезда, 66% - 2 звезды, 100% - 3 звезды. Чтобы перейти на следующий уровень, получите хотя бы 1 звезду и нажмите на стрелку в правом верхнем углу.'
						}}

					</p>
					<img v-bind:src="!notRussian ? 'rules2.png' : 'rules2EN.png'" alt="Подсказка">
					<p v-if="!notRussian">
						Примечание: буква "е" и "ё" взаимозаменяемы по техническим причинам.
					</p>
					{{notRussian ?
					'Click on a word to get its definition.' :
					'Нажатие на слово позволит вам узнать его значение. Словарь игры постоянно пополняется. Если вы обнаружили лишнее или недостающее слово, пожалуйста, сообщите нам в'
					}}
					<a href="https://vk.com/jaugr"  v-if="!notRussian" target="_blank" rel="noopener noreferrer" class="settings__text" @click="()=>{sendParams({'vk-fromRules': 1})}"
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
				{{notShowResult ? 'Призы' : 'Результаты'}}
			</h2>
			<div class="levelClosedText">
				<template v-if="notShowResult">
					Список призов:
					<ul>
						<li>Первое место - умная колонка «Яндекс Станция Мини»</li>
						<li>Второе место - промокод в Яндекс Маркет на 3000 ₽</li>
						<li>Третье место - промокод в Яндекс Маркет на 2000 ₽</li>
						<li>4-50 места - промокод в Яндекс Маркет на 300 ₽</li>
						<li>51-500 места - 50 Янов на игровой баланс платформы Яндекс.Игры</li>
					</ul>

					Результаты Фестиваля Слов будут опубликованы 27 июля после 12:00 по МСК!
				</template>
				<template v-else-if="isResultLoading">
					Идёт загрузка результатов...
				</template>
				<template v-if="!notShowResult && !isResultLoading">

					<template v-if="eventResult >= 1 && eventResult <= 3">
						<h2>Поздравляем!</h2>
						<p>Вы заняли <span class="prizeText">{{playerInfo.rank}} место</span> на Фестивале Слов!</p>
						<div>Ваш приз: 🏆 {{getPrize()}} 🏆</div>
					</template>
					<template v-if="eventResult === 4">
						<h2>Спасибо за участие!</h2>
						<p>Вы заняли <span class="prizeText">{{playerInfo.rank}} место</span> на Фестивале Слов!</p>
						<div class="eventDivWithMargins">К сожалению, вы не заняли одно из призовых мест.</div>
						<div class="eventDivWithMargins">Но без подарков не останетесь, ведь 35 дополнительных подсказок уже на вашем счету!</div>
					</template>

					<template v-if="eventResult === 1">
						<div class="eventReceive">Для его получения вам необходимо</div>
						<ul>
							<li>Сделать скриншот этого сообщения</li>
							<li class="mailPrize">
								Отправить скриншот на почту
								<a class="prizesText" href="mailto:yndx-games-prizes@yandex.ru">yndx-games-prizes@yandex.ru</a>
							</li>
						</ul>
						А дополнительные 100 подсказок уже на вашем счету!
					</template>
					<template v-if="eventResult === 2">
						<div class="eventReceive promoCode">Ваш промокод: {{getPromoCode()}}</div>
						А дополнительные 75 подсказок уже на вашем счету!
					</template>
					<template v-if="eventResult === 3">
						<div class="eventDivWithMargins">Яны автоматически зачислятся на ваш баланс Яндекс.Игр через некоторое время.</div>
						<div class="eventDivWithMargins">А дополнительные 50 подсказок уже на вашем счету!</div>
					</template>
					<template v-if="eventResult === 1 || eventResult === 2">
						<a class="rules__goBg" href="mailto:yndx-games-prizes@yandex.ru" v-if="eventResult === 1">Связаться</a>
						<div class="rules__goBg" @click="copyPromoCode()" v-if="eventResult === 2">Скопировать</div>
						<p class="uniqueID">{{playerInfo.player.uniqueID}}</p>
					</template>
					<template v-if="eventResult === 0">
						К сожалению, вы не участвовали в Фестивале Слов или не были авторизованы
					</template>


				</template>

			</div>


		</div>

		<div class="rules-blackout" v-if="isInfoAboutClosedEvent" @click="toggleInfoAboutClosedEvent"></div>

		<div class="rules" v-if="isInfoAboutClosedEvent">
			<cross-vue @click.native="toggleInfoAboutClosedEvent()" ></cross-vue>
			<h2 class="rules__menu">
				Фестиваль завершён
			</h2>
			<div class="levelClosedText">
				Начисление очков в Фестивале Слов завершено. Теперь вы можете играть только без зачёта очков в рейтинг.
				Результаты фестиваля вы сможете увидеть 27 июля после 12:00 по МСК! Спасибо за участие!
			</div>

		</div>




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

import './styles/stylesLocations.scss';
// import './styles/stylesDarkTheme.scss';
import {allWordsRU} from './russianWords';
import {dictionaryRU} from './russianDictionary';
import {wordsFromWordsRU} from "./russianWordsFromWords";
import {allWordsEN} from './englishWords';
import {wordsFromWordsEN} from './englishWordsFromWords'
// import {getBusinessEvent} from "./gameAnalytics";
import {wordsList} from './wordsList';
import {locationWords} from "./locationWords";
import {whyBadWord} from './whyBadWord';
import CrossComponent from './cross';
import CrossVue from "@/cross";

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

let advTime = false;
let startAdvTime = false;
setTimeout(()=>{
	advTime = true;
	startAdvTime = true;
}, 30000);
let showAdv, playerGame, payments, YSDK;



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

function replaceLevelsToOne(data, isLocationLevels){
	let keys = Object.keys(data);
	const newData = {};
	keys.forEach((key)=>{
		try{
			let len;
			if(isLocationLevels) len = locationWords.wordsFromWords[key].length;
			else len = wordsFromWords[key].length;
			if(data[key].length === len){
				newData[key] = 1;
			}else{
				newData[key] = data[key].slice();
			}
		}catch(ignored){}
	});
	return newData;
}
// function compressLevelsToString(doneLevels){
// 	try{
// 		let firstElem = doneLevels[0];
// 		let lastElem = firstElem;
// 		let newArr = [];
// 		for(let i = 1; i < doneLevels.length+1; i++){
// 			let level = doneLevels[i];
// 			if(lastElem+1 === level){
// 				lastElem = level;
// 			}else{
// 				if(firstElem === lastElem){
// 					newArr.push(firstElem);
// 				}else{
// 					newArr.push(firstElem+'-'+lastElem);
// 				}
// 				firstElem = level;
// 				lastElem = level;
// 			}
// 		}
// 		return newArr;
// 	}catch(e){
// 		console.log(e);
// 		return doneLevels;
// 	}
// }
// function decompressStringToLevels(doneLevels){
// 	try{
// 		let newArr = []
// 		for(let i = 0; i < doneLevels.length; i++){
// 			let num = doneLevels[i];
// 			if(Number.isInteger(num)){
// 				newArr.push(num);
// 			}else{
// 				let firstAndLastItem = num.split('-');
// 				for(let i = Number(firstAndLastItem[0]); i < Number(firstAndLastItem[1])+1; i++){
// 					newArr.push(i);
// 				}
// 			}
// 		}
// 		return newArr;
// 	}catch(e){
// 		console.log(e);
// 		return doneLevels;
// 	}
// }
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
	console.log(dl);
	console.log(data);
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

	console.log(data);

	return data;
}

function compressData(data, isLocationData){
	//Если заполнены все слова, уровень - 1
	if(data === null || data === undefined) return;

	let newData =  replaceLevelsToOne(data, isLocationData);
	if(!isLocationData){
		newData = compressDataObj(newData);
		newData = newCompress(newData);
	}
	return newData;
	// console.log(newData);
	// return LZString.compressToUTF16(JSON.stringify(newData));
}
function decompressData(data){
	let newData = data;
	if(typeof newData === "string"){
		newData = JSON.parse(LZString.decompressFromUTF16(data));
	}
	console.log('decompress');


	if(newData.doneLevels !== undefined){
		console.log('doneLevels');

		if(newData.newCompress){
			console.log('newCompress');
			newData = newDecompress(newData);
		}
		console.log(newData.doneLevels);
		newData = decompressDataObj(newData);
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
function newCompress(compressedWords){
	let data = {};
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels') return;
		data[el] = findMaxInArr(compressedWords[el]);
	});
	data.doneLevels = compressedWords.doneLevels;
	data.newCompress = true;
	data.notStringed = true;
	return data;
}

//Вибрация
//
// function vibratePhone(){
// 	try{
// 		if (window.navigator && window.navigator.vibrate) {
// 			window.navigator.vibrate(500);
// 		}
// 	}catch(e){
// 		console.log('Вибрация не поддерживается');
// 		console.log(e);
// 	}
// }

function newDecompress(compressedWords){
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






const lastVersion = "ver-27";
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
	} catch (e) {
	}
}

function setToStorage(name, val) {
	try {
		if(name === 'allDoneWords'){
			if(notRussianGame){
				localStorage.setItem('allDoneWordsEN', val);
				// localStorage.setItem('timeEN', getSec() );
				return;
			}else{
				// localStorage.setItem('time', getSec() );
			}
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
let allDoneWords = getFromStorage('allDoneWords');
let locationDoneWords = getFromStorage('locationDoneWords');
let tips = getFromStorage('tips');
let sounds = getFromStorage('sounds');
let isLastSounds = getFromStorage('lastSounds');
let isAdvShowed = getFromStorage('isAdvShowed');
let isGameAdvShow = getFromStorage('isGameAdvShow');
let isGameUpdate = getFromStorage('gameUpdate-1');
let chosenBackground = getFromStorage('chosenBackground');
let portraitAdviceAmount = getFromStorage('portraitAdviceAmount');
let isLvlFiveHintDone = getFromStorage('isLvlFiveHintDone');
let savedMyGame = getFromStorage('savedMyGame');
let infoAboutMyGame = getFromStorage('infoAboutMyGame');
let infoAboutClosedEvent = !!getFromStorage('infoAboutClosedEvent');
let infoAboutEvent = !!getFromStorage('infoAboutEvent');
let gotGift = !!getFromStorage('gotGift');
if(savedMyGame){
	try{
		savedMyGame = JSON.parse(savedMyGame);
	}catch(e){
		savedMyGame = false;
	}
}
if(infoAboutMyGame){
	infoAboutMyGame = Number(infoAboutMyGame);
	if(!Number.isInteger(infoAboutMyGame)) infoAboutMyGame = 0;
}else{
	infoAboutMyGame = 0;
}
if(chosenBackground){
	chosenBackground = Number(chosenBackground);
	// importBg(chosenBackground, true);
}else{
	if(allDoneWords){
		chosenBackground = 0;
		setToStorage('chosenBackground', '0');
	}else{
		chosenBackground = -3;
		setToStorage('chosenBackground', chosenBackground);
	}
	// deleteBlockBg = true;
}

params({'chosenBackground': chosenBackground});

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
let allLocations = Math.floor(allWords.length / lvlsOnPage);
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
	'костылева': 'выселок'
};
function fixDoneWords(allDoneWords, isLocationWords) {
	let keys = Object.keys(allDoneWords);
	for(let i = 0; i < keys.length; i++){

		let k = keys[i];
		if(keys[i].indexOf('ё') !== -1){
			k = k.replace(/ё/g, 'е');
			console.log(k);
		}else if(wordsForReplace[k]){
			k = wordsForReplace[k];
		}
		let words = allDoneWords[keys[i]] || allDoneWords[k];

		if(words === 1){
			if(isLocationWords){
				if(locationWords.wordsFromWords[k]){
					allDoneWords[k] = locationWords.wordsFromWords[k];
				}else{
					delete allDoneWords[keys[i]];
				}


			}else{
				allDoneWords[k] = wordsFromWords[k];
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
				let allWords = wordsFromWords[k];
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


let eventProgress = getFromStorage('eventProgress');
if(eventProgress){
	eventProgress = fixDoneWords(JSON.parse(eventProgress), true);
}else{
	eventProgress = {};
}

function getEventScore(eventProgress){
	let score = 0;
	Object.keys(eventProgress).forEach((key) => {
		if(eventProgress[key] === 1){
			if(locationWords.wordsFromWords[key]){
				for(let i = 0; i < locationWords.wordsFromWords[key].length; i++){
					score += locationWords.wordsFromWords[key].length;
				}
			}
		}else{
			for(let i = 0; i < eventProgress[key].length; i++){
				score += eventProgress[key][i].length;
			}
		}
	})
	return score;
}
let thatTips = 15;
if(allDoneWords){
	allDoneWords = fixDoneWords(JSON.parse(allDoneWords));
	tips = Number(tips);
	thatTips = tips;
	if(!Number.isInteger(tips)) tips = 15;
	sounds = sounds === 'true';
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

	allWords.forEach((key => {
		allDoneWords[key] = [];
	}));
	for(let i = 0; i < allWords.length; i++){
		allStars.push(0);
	}

}
if(locationDoneWords){
	locationDoneWords = fixDoneWords(JSON.parse(locationDoneWords), true);
}else{
	locationDoneWords = {};
}
try{
	if (getFromStorage('allDoneWordsEN')) {
		isRules = false;
	}
}catch(e){}




function switchToEnglishVersion(){
	wordsFromWords = wordsFromWordsEN;
	allWords = allWordsEN;
	notRussianGame = true;
	sounds = sounds === 'true';
	let allDoneWordsEN = getFromStorage('allDoneWordsEN');
	let tipsEN = getFromStorage('tipsEN');
	if(allDoneWordsEN){
		allDoneWords = fixDoneWords(JSON.parse(allDoneWordsEN));
		tipsEN = Number(tipsEN);
		if(tipsEN) tips = tipsEN;
		isRules = false;

		setLoc();
	}
}


let recentState = JSON.stringify(PLAYESTATE);
let recentStats = JSON.stringify(PLAYERSTATS);

let showUpdate = false;
let lastUpdate = getFromStorage('wasUpdate');
if(lastUpdate !== lastVersion && lastLevel > 0) {
	showUpdate = true;
	console.log(lastVersion + '; showUpdate: ', showUpdate);
}
showUpdate = false;
setToStorage('wasUpdate', lastVersion);

function getSec(){
	let date = new Date();
	return date.getTime()
}
let recentEventState = JSON.stringify(eventProgress);
function setState(isNow) {
	const newData = JSON.stringify(PLAYESTATE);
	const newData2 = JSON.stringify(eventProgress);
	if(recentState === newData && recentEventState === newData2 && !isNow) return;
	console.log('setState');
	recentState = newData;

	if (playerGame) {

		if(notRussianGame){
			console.log(PLAYESTATE);
			const newState = {
				allDoneWords: russianProgressSave,
				allDoneWordsEN: compressData(PLAYESTATE.allDoneWords)
			};
			newState.gotGift = gotGift;
			if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true)
			if(eventProgress) newState.eventProgress = compressData(eventProgress, true)
			playerGame.setData(newState, true).then(() => {}).catch((ignored) => {})


		}else{
			// console.log(PLAYESTATE);
			// console.log(fixDoneWords(JSON.parse(getFromStorage('allDoneWords'))));
			const newState = {
				allDoneWords: compressData(PLAYESTATE.allDoneWords)
			};
			newState.gotGift = gotGift;
			if(englishProgress) newState.allDoneWordsEN = englishProgress;
			if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true);
			if(eventProgress) newState.eventProgress = compressData(eventProgress, true);
			// console.log('SendState');
			// console.log(newState);
			playerGame.setData(newState, false).then(() => {console.log('data saved')}).catch((error) => {
				try{
					params({'cantSave-first': error});
					console.log(error)
					if(error.toString().includes('large')){
						params({'cantSave-bigData-first': lastLevel});
					}
				}catch(ignored){}
				playerGame.setData(newState, true).then(() => {}).catch((ignored) => {})
			});
		}


	}
}
function setStats() {
	console.log('setStats');
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

			playerGame.setStats(progress, false).then((ignored) => {}).catch(()=>{
				playerGame.setStats(progress, true).then((ignored) => {})
			});
		}

	}





}

function saveAllData(isNow){
	setState(isNow);
	setStats(isNow);
}

window.onblur = () => saveAllData();
window.onunload = () => saveAllData();
window.onunload = () => saveAllData();
window.onpagehide = () => saveAllData();




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
			allStars += testStar(allDoneWords[key].length, wordsFromWords[key].length);
		}
	}));
	return allStars;
}
function getLocationStars(currentLocation){
	let allStars = [];
	let allWords = locationWords[currentLocation];
	allWords.forEach((key => {
		try{
			if(currentLocation === 'event'){
				if(eventProgress[key]){
					allStars.push(testStar(eventProgress[key].length, locationWords.wordsFromWords[key].length));
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
				allStars.push(testStar(allDoneWords[key].length, wordsFromWords[key].length))
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
let timeToShowAdv = 200;

function startAdvInterval(){
	advInterval = setInterval(()=>{
		timeToShowAdv -= 5;
		if(timeToShowAdv <= 5){
			timeToShowAdv = 5;
			clearInterval(advInterval);
		}
	}, 5000);
}
if(window.YaGames){
	window.YaGames.init({
		adv: {
			onAdvClose: wasShown => {
				if(!wasShown) {
					advTime = true;
				}

				canShowAdv();
			}
		}
	}).then(ysdk => {
		YSDK = ysdk;
		try{
			console.log("LANG: ", ysdk.environment.i18n.lang);
			notRussianGame = !ruLangs.includes(ysdk.environment.i18n.lang);
			if(notRussianGame){
				console.log('EN');
				isRules = false;
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
					onClose: function(wasShow) {
						console.log('close adv');
						if(!wasShow){
							advTime = true;
						}else{
							// if(isPhone){
							// 	params({'showMobileAdv': 1});
							// }else{
							// 	params({'showDesktopAdv': 1});
							// }
							clearTimeout(advTimeout);
							clearInterval(advInterval);

							timeToShowAdv = 130;
							startAdvInterval();

							advTimeout = setTimeout(()=>{
								advTime = true;
								clearInterval(advInterval);
								canShowAdv();
							}, 120000);


							onCloseFunc();
						}

						canShowAdv();
					},
					onError: function (e){
						advTime = true;
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

function globalTryShowAdv(onCloseFunc){
	if(showAdv && advTime){
		advTime = false;
		canShowAdv();
		setTimeout(()=>{
			showAdv(onCloseFunc);
		}, 1000)
		return true;
	}
	return false;
}
function update() {
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("updateAll"));
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
let paymentCatalog = false;

function delParams(par){
	const url = new URL(document.location);
	const searchParams = url.searchParams;
	searchParams.delete(par);
	window.history.pushState({}, '', url.toString());
}

function decompressLocationWords(locationDoneWords){
	let keys = Object.keys(locationDoneWords);
	keys.forEach((key)=>{
		if(locationDoneWords[key] === 1) locationDoneWords[key] = locationWords.wordsFromWords[key];
	});
	return locationDoneWords;
}


function initPlayer(ysdk) {
	console.log(ysdk);
	ysdk.getPlayer().then(_player => {
		console.log('get player');



		// Игрок авторизован.
		playerGame = _player;
		try{
			params({'auth': 1});
			if(_player._personalInfo.mode === "lite" || _player.mode === "lite"){
				params({'authLite': 1});
				console.log('Lite auth');
			}
		}catch(e){
			console.log(e);
		}
		console.log('PLAYER');
		console.log(playerGame);

		let someTrue = false;

		playerGame.getData(['allDoneWords', 'time', 'allDoneWordsEN', 'locationDoneWords', 'eventProgress', 'gotGift'], false).then((dataObject) => {
			console.log(dataObject);
			if(dataObject.gotGift){
				gotGift = dataObject.gotGift;
			}
			if(dataObject.eventProgress){
				dataObject.eventProgress = fixDoneWords(decompressLocationWords(dataObject.eventProgress), true);
				let playerScore = getEventScore(dataObject.eventProgress);
				let lastScore = getEventScore(eventProgress);
				if(playerScore > lastScore) eventProgress = dataObject.eventProgress;
			}
			if(notRussianGame){
				allDoneWords = {};
				PLAYESTATE = {allDoneWords: {}};
				console.log("DATA EN");
				console.log(dataObject.allDoneWordsEN);
				if(dataObject.allDoneWordsEN){
					let newData = dataObject.allDoneWordsEN;

					if(typeof newData === "string" || (typeof newData === "object" && newData.notStringed)){
						newData = decompressData(newData);
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
				if(typeof newData === "string"  || (typeof newData === "object" && newData.notStringed)){
					newData = decompressData(newData);
				}else if(newData.doneLevels !== undefined){
					newData = decompressDataObj(newData);
				}
				newData = fixDoneWords(newData);
				console.log(newData);




				let localStars = getAllStars(fixDoneWords(allDoneWords));
				let serverStars = getAllStars(newData);
				let localLevel = 0;
				let serverLevel = 0;
				try{
					localLevel = setLastLevel(true, fixDoneWords(allDoneWords));
					serverLevel = setLastLevel(true, newData);
				}catch(e){
					console.log(e);
				}
				console.log(localStars, serverStars, localLevel, serverLevel);
				let dataNotChanged = true;
				if(localLevel >= serverLevel && localStars >= serverStars){
					let isChange = localStars > serverStars;
					try{
						if(!isChange && localLevel === serverLevel){
							let w = allWordsRU[localLevel];
							let localWords = fixDoneWords(allDoneWords)[w].length;
							let serverWords = newData[w].length;
							if(localWords > serverWords){
								isChange = true;
								console.log('LocalWords > ServerWords');
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
					setToStorage('allDoneWords', JSON.stringify(replaceLevelsToOne(allDoneWords)));
				}
			}

			if(dataObject.locationDoneWords){
				PLAYESTATE.locationDoneWords = fixDoneWords(decompressLocationWords(dataObject.locationDoneWords), true);
				locationDoneWords = PLAYESTATE.locationDoneWords;
			}
			//Вовзврат прогресса
			try{
				let pay = ysdk.environment.payload;
				if(pay){

					let lvl2 = pay.match(/zlms\d+/);
					if(lvl2) {
						lvl2 = Number(lvl2[0].replace('zlms', ''));
						if(lvl2){
							let newObj = {};
							for (let i = 0; i < lvl2; i++) {
								newObj[allWords[i]] = wordsFromWords[allWords[i]];
							}
							PLAYESTATE.allDoneWords = newObj;
							allDoneWords = newObj;
							setState();
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
			someTrue = true;
		});

		playerGame.getStats(['tips', 'tipsEN'], false).then((dataObject) => {
			// console.log('StATS');
			// console.log(dataObject);
			if(notRussianGame){
				if(Number.isInteger(dataObject.tipsEN)){
					tips = dataObject.tipsEN;
				}else{
					tips = 10;
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
			someTrue = true;
		});
	}).catch((e) => {
		console.log(e);
		doDeleteBlock = true;
		update();
	});
	ysdk.getPayments({ signed: false }).then(_payments => {
		_payments.getCatalog().then(catalog => paymentCatalog = catalog );
		// Покупки доступны.
		payments = _payments;
		payments.getPurchases().then(purchases => purchases.forEach(consumePurchase));
	}).catch(err => {
		console.log(err);
	});
}
let TIPS = 0;
let allTips = [20,50,100];
function consumePurchase(purchase) {
	if (purchase.productID === 'cart_item2') TIPS = allTips[0];
	if (purchase.productID === 'cart_item3') TIPS = allTips[1];
	if (purchase.productID === 'cart_item4') TIPS = allTips[2];
	params({[purchase.productID]: 1});
	document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
	payments.consumePurchase(purchase.purchaseToken);
}
const itemsPrices = [49, 99, 149];
function buyTips(item) {
	if(payments && playerGame){
		let purchaseItem = 'cart_item' + item;
		payments.purchase(purchaseItem).then(purchase => {
			if(purchase.productID === purchaseItem){
				if(item === 2) TIPS = allTips[0]; //20
				if(item === 3) TIPS = allTips[1]; //50
				if(item === 4) TIPS = allTips[2]; //100
				let it = 'buy-' + item;
				params({[it]: 1});
				document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
				payments.consumePurchase(purchase.purchaseToken);

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
			return amount + ' ' + getRightWord(amount);
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
			loop: false
		};

		for(var i in options){
			if(options.hasOwnProperty(i)) {
				this.settings[i] = options[i];
			}
		}

		this.url = url + '.mp3';
		this.volume = 1;
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

				if(!this.manager.playingSounds.hasOwnProperty(this.url)) {
					this.manager.playingSounds[this.url] = [];
				}
				this.manager.playingSounds[this.url].push(source);
			}
		},
		stop: function () {
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

let wrongWordSound = new NewAudioContext('wrong-word');
let wrongWordSound2 = new NewAudioContext('wrong-word2');
let wordWasSound = new NewAudioContext('word-was');
let doneWordSound = new NewAudioContext('done-word');
let doneWordSound2 = new NewAudioContext('done-word2');
let starVolume = new NewAudioContext('star');
// let newLevel = new NewAudioContext('new-level');
let clickSound = new NewAudioContext('click');
let clickSound2 = new NewAudioContext('click2');
// let exitLevelSound = new NewAudioContext('exitLevel');

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
	'валер': 'валёр'
}


function getWordDesc(word) {
	console.log('getWordDesc --- ', word);
	if(notRussianGame) return getEngDesc(word);
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
		wordDefinition.innerHTML = 'Определение слова - загрузка...';
		defIframe.onload = function (){
			wordDefinition.innerHTML = '';
		}
		defIframe.src = 'https://ru.m.wiktionary.org/wiki/' + word + '#Значение';
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
	if (document.querySelector(".pre-download2")) {
		document.querySelector(".pre-download2").remove()
	}
}

const cloudPhrases = [
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

const cloudLevelPhrases = [
	'Перейдите в меню, нажав на домик, чтобы выбрать <span class="cloudHint__mainText">цветовое оформление</span> в настройках.',
	'В игре есть <br><span class="cloudHint__mainText">тематические локации</span><br> Найдите их в меню, нажав на значок книжки.',
	'По техническим причинам буква <br><span class="cloudHint__mainText">Е приравнивается к Ё</span>. Учитывайте это при создании слов. Удачи!'
]

let lvl5Phrase = 'Этот уровень особенно сложен, дарим вам <span class="cloudHint__mainText">5 дополнительных подсказок</span>. Удачной игры!';

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
	event: 'Фестиваль Слов'
}

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
let isShowBanner = true;
let bannerTimeout;
function getVerticalBanner(){
	console.log('tryGetVerticalBanner');
	try{
		isShowBanner = false;
		if(window.innerHeight >= 600){
			console.log('getVerticalBanner');


			setTimeout(()=>{

				if(window.innerWidth > window.innerHeight && window.innerHeight >= 750){
					//Десктоп
					window.yaContextCb.push(()=>{
						Ya.Context.AdvManager.render({
							renderTo: 'yandex_rtb_R-A-518275-40',
							blockId: 'R-A-518275-40'
						})
					})
				}else if(window.innerHeight < 700){
					window.yaContextCb.push(()=>{
						Ya.Context.AdvManager.render({
							renderTo: 'yandex_rtb_R-A-518275-41',
							blockId: 'R-A-518275-41'
						})
					})
				} else{
					window.yaContextCb.push(()=>{
						Ya.Context.AdvManager.render({
							renderTo: 'yandex_rtb_R-A-518275-38',
							blockId: 'R-A-518275-38'
						})
					})
				}
				// params({'getVerticalBanner': 1});
				bannerTimeout = setTimeout(()=>{
					isShowBanner = true;
				}, 60000);
			}, 200);
		}
	}catch(e){
		console.log(e);
	}
}
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
			let scrollEl = document.querySelector('.leaderBoardInfo_my');
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
function testShowResult(){
	const today = new Date();
	const day = today.getUTCDate();
	const hours = today.getUTCHours();
	const month = today.getUTCMonth();
	return (day === 27 && hours >= 9) || day > 27 || month > 6;
}
function testSendResult(){
	const today = new Date();
	const day = today.getUTCDate();
	const hours = today.getUTCHours();
	const month = today.getUTCMonth();
	return (day === 26 && hours >= 21) || day > 26 || month > 6;
}
function testFastSendResult(){
	const today = new Date();
	const day = today.getUTCDate();
	const hours = today.getUTCHours();
	return day === 26 && hours >= 20;
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
const proms = ['','S9EGUU3H', 'XGKA0D5H', 'S4CSRGZP', '3A8PGG7D', 'EDCSH7GE', 'FD8ZSV9D', '95F3MEV1', 'PZDVMFEW', 'MM4DS8MG', '9448GRNB', '830F80MG', '33K4HXU7', 'ZXR6FW9V', '54TXER60', 'PP8N040R', '2GRCE3FN', '2ZE5R0B8', '4EKPYGRB', 'SVB171SH', 'BKZD4VM8', 'VWK9M33S', '4BGB9193', '212K1XWM', 'SKR30G5Y', 'VRBY4F21', '9P5NH4R8', 'GR83KS6N', '85DXSFHZ', '68ZBWVES', 'SSFKP5NE', 'AZCZYTUW', 'R0X69GMN', 'C9NCPASC', 'YH4CWAG8', 'Z7E2AV97', 'ACUM8PZN', '9993S2DA', 'W9BYGVW2', '3N9SUDHD', 'Z86256RK', 'DXZ4B2U7', 'D0KWF6AA', '7G1W0SFB', '6E2ARNPT', '0EGA98NU', '9FXHNSGG', '2T6RMG8F', 'UB87KFPH', 'T7GS52D5'];
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
			allLocationsNames: ['cinema', 'birds', 'fbv', 'eightMarch', 'animals', 'magicTales',  'newYear'],
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
			howManyTips: 10,
			eventLocation: false,
			eventLocationWordsAMount: 300,
			isInfoAboutTips: false,
			isEventResult: false,
			eventResult: 0,
			notShowResult: false,
			isResultLoading: false,
			playerInfo: {
				"player": {
					"uniqueID": 'dasdasd/Pdsa--BsfSs/jhWk=',
				},
				rank: 26
			},
			isInfoAboutClosedEvent: false
		}
	},
	computed:{
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
			if(this.doneWords.length >= this.nowWords.length) return 'Уровень пройден!';
			let wordsAmount = howManyWordsToStar(this.doneWords.length, this.nowWords.length);
			return 'До следующей звезды осталось ' + wordsAmount;
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
		}
	},
	methods:{
		getEventPrize(){
			if(!gotGift){
				params({'getGift': this.eventResult});
				if(this.eventResult === 1){
					this.tipCount += 100;
				}else if(this.eventResult === 2){
					this.tipCount += 75;
				}else if(this.eventResult === 3){
					this.tipCount += 50;
				}else if(this.eventResult === 4){
					this.tipCount += 35;
				}
				setToStorage('tips', this.tipCount);
				PLAYERSTATS.tips = this.tipCount;
				setToStorage('gotGift', 'true');
				gotGift = true;
				saveAllData(true);
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
									if(player.rank === 1){
										this.eventResult = 1;
									}else if(player.rank <= 50){
										this.eventResult = 2;
									} else if(player.rank <= 500){
										this.eventResult = 3;
									}else if(player.score !== 0){
										this.eventResult = 4;
									}else{
										this.eventResult = 0;
									}
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
			if(this.playerInfo.rank === 1) return 'умная колонка «Яндекс Станция Мини»';
			if(this.playerInfo.rank === 2) return 'промокод в Яндекс Маркет на 3000 ₽';
			if(this.playerInfo.rank === 3) return 'промокод в Яндекс Маркет на 2000 ₽';
			if(this.playerInfo.rank <= 50) return 'промокод в Яндекс Маркет на 300 ₽';
			if(this.playerInfo.rank <= 500) return '50 Янов';
			return '50 подсказок'
		},
		getPromoCode(){
			return proms[this.playerInfo.rank-1];
		},
		copyPromoCode(){
			copyToClipboard(this.getPromoCode());
		},
		toggleInfoAboutClosedEvent(){
		this.isInfoAboutClosedEvent = !this.isInfoAboutClosedEvent;
		},
		toggleIsEventResult(){
			this.rules = false;
			this.isEventResult = !this.isEventResult;
			this.getEventResult();
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
		startCreateGame(isContinue){
			if(isContinue){
				this.gameWord = this.savedMyGame.word;
			}
			console.log(isContinue);
			if(/^[а-яёА-ЯЁ]+$/.test(this.gameWord)
				&& this.gameWord.length > 3 && this.gameWord.length < 13){
				this.gameWord = this.gameWord.replace(/ё/g, 'е');
				this.gameWordMistake = false;
				this.isMyGame = true;
				this.isCreateGameWindow = false;
				this.closeAllBeforeStartLevel(false);
				this.gameWord = this.gameWord.toLowerCase();
				this.lvl = 9998;
				this.word = this.gameWord;
				this.doneWords = [];
				if(isContinue){
					this.doneWords = this.savedMyGame.words;
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
				this.getVerticalBanner();
				this.gameWord = '';
				params({'createGameLevel': 1});
			}else{
				this.gameWordMistake = true;
			}
		},
		toggleIsCreateGameWindow(){
			this.isCreateGameWindow = !this.isCreateGameWindow;
			if(this.isCreateGameWindow){
				this.gameWordMistake = false;
				if(infoAboutMyGame < 2){
					this.isInfoAboutCreateGame = true;
					setToStorage('infoAboutMyGame', infoAboutMyGame + 1);
					infoAboutMyGame = 2;
				}

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
			this.advTimer = 65;
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
			params({'goToGetLoc': 1});
			this.backMenu();
			this.showLocations = true;
			this.showLastLevelInfo = false;
		},
		openGameLocation(location){
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
				eventScore = getEventScore(eventProgress);
				this.openEventLocation();
				if(!infoAboutEvent){
					this.toggleRules();
					setToStorage('infoAboutEvent', 'true');
				}
				if(testShowResult() && !gotGift){
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
					scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
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
			if(this.chosenBg === 4) this.chosenBg = -4;
			this.testBg();
		},
		changeBgLeft(){
			this.chosenBg--;
			if(this.chosenBg === -5) this.chosenBg = 3;
			this.testBg();
		},
		testBg(){
			if(this.chosenBg > 0 && !this.isCloseLevelShow(bgLvlsOpen[this.chosenBg-1]+1)){
				this.chosenBgRight = this.chosenBg;
				// importBg(this.chosenBgRight);
			}else if(this.chosenBg <= 0){
				this.chosenBgRight = this.chosenBg;
			}
			params({'choseBg': this.chosenBgRight});
			setToStorage('chosenBackground', this.chosenBgRight);
		},
		goChangeBgFromUpdate(){
			this.goToChangeBg();
			this.chosenBg = -4;
			this.chosenBgRight = this.chosenBg;
			setToStorage('chosenBackground', this.chosenBgRight);
			params({'changeBgCave': 1});
		},
		goToChangeBg(){
			this.backMenu();
			this.isSettings = true;
			this.openNewBg = false;
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
				params({'skipTutorial': 1});
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
			this.canShowSkip = true;
			this.isTutorial = true;
			this.cloudHint = true;
		},
		closeHint(){
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
				this.cloudsPhrase = cloudPhrases[1];
				this.tutorialSelected = 0;
			} else if(tutorialStep === 5){
				this.tutorialSelected = 2;
				this.cloudsPhrase = cloudPhrases[1];
			} else if(tutorialStep === 10){
				this.tutorialSelected = 1;
				this.cloudsPhrase = cloudPhrases[1];
			}else if(tutorialStep === 17){
				this.cloudsPhrase = cloudPhrases[8];
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
			this.cloudsPhrase = cloudLevelPhrases[lvl-1];
		},
		nextStep(){

			if(tutorialStep >=1 && tutorialStep <= 3){
				this.tutorialSelected = 2 + tutorialStep;
			}else if(tutorialStep === 6){
				this.tutorialSelected = 1;
			}else if(tutorialStep === 7){
				this.tutorialSelected = 4;
			}else if(tutorialStep === 8 || tutorialStep === 13){
				this.tutorialSelected = 5;
			} else if(tutorialStep === 11){
				this.tutorialSelected = 2;
			}else if(tutorialStep === 12){
				this.tutorialSelected = 3;
			}else if(tutorialStep === 4 || tutorialStep === 9 || tutorialStep === 14){
				this.tutorialSelected = -1;
				this.selectSend = true;
				this.cloudsPhrase = cloudPhrases[2];
			}else{
				return;
			}
			tutorialStep++;
		},
		togglePurchaseCompleted(){
			this.purchaseCompleted = false;
		},
		getAuth(){
			try{
				YSDK.auth.openAuthDialog().then(() => {
					initPlayer(YSDK);
				}).catch((e) => {
					console.log(e);
				});
			}catch(ignored){}

		},
		getPlayerLB(getGameLb, getEventLb){

			// this.playerRait = {
			// 	rank: 14, score: 19, player: {uniqueID: 123}
			// };
			// this.lbInGame = [
			// 	{rank: 1, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 2, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 3, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 4, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 5, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 6, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 7, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 8, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 9, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 10, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 11, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 12, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 13, score: 21, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 14, score: 19, player: {uniqueID: 123, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 15, score: 18, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 16, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 17, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 18, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 19, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// 	{rank: 20, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
			// ].reverse();
			// goToUserInLb();
			// return;



			try{
				let that = this;
				isShowBanner = false;
				clearTimeout(bannerTimeout);
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
										bannerTimeout = setTimeout(()=>{
											isShowBanner = true;
										}, 40000);
									}

									if(getEventLb){
										eventScore = getEventScore(eventProgress);
										console.log('myScore: ', eventScore);
										if(eventScore > player.score && !testSendResult()){
											lb.setLeaderboardScore('event', eventScore);
										}
									}else{
										if(that.allStars > player.score){
											lb.setLeaderboardScore('lvl', that.allStars);
										}
									}

								})
								.catch(e => {
									console.log(e);
									isShowBanner = true;
								})
						}
						if(getEventLb) getMyLbByName('event');
						else getMyLbByName('lvl');


					})
				;
			}catch(e){
				this.playerRait = false;
				isShowBanner = true;
				console.log(e);
			}
		},
		addPlayerToLB(fromTestStars){
			let that = this;
			try{
				YSDK.getLeaderboards()
					.then(lb => {
						if(this.eventLocation) {
							if(!testSendResult()){
								lb.setLeaderboardScore('event', eventScore);
							}
						}
						else lb.setLeaderboardScore('lvl', that.allStars);
						if(fromTestStars){
							this.getLeaderBoardInGame();
						}

					});
			}catch(e){
				console.log(e);
			}
		},
		getLeaderBoard(getEventLb){
			let that = this;
			this.getPlayerLB(false, getEventLb);
			YSDK.getLeaderboards()
				.then(lb => {
					console.log(lb);
					function getLbByName(name){
						// Получение 10 топов
						lb.getLeaderboardEntries(name, { quantityTop: 20, includeUser: true, quantityAround: 10}).then(res => {
							that.leaderBoard = res.entries;
							goToUserInLb();
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
		},
		getLeaderBoardInGame(){
			if(window.innerHeight >= 600){
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
				this.cloudsPhrase = cloudPhrases[6];
				tutorialStep++;
				this.selectMainWord = false;
				this.selectTip = true;
			}
		},
		getItemPrice(item){
			try{
				if(paymentCatalog){
					return paymentCatalog[item].price;
				}
			}catch(e){}
			return itemsPrices[item] + 'р';
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
			if(isRules && !notRussianGame && isShowTutorial && !payloadLevel && lastLevel === 0){
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



			if(window.innerWidth > window.innerHeight){
				params({'orientation': 'landscape'});
			}else{
				params({'orientation': 'portrait'});
			}


			if(lvl !== 0 && lvl % 100 === 0 && notRussianGame){
				let name = 'eng' + lvl;
				params({[name]: 1});
			}




			this.closeAllBeforeStartLevel(notSound);

			this.lvl = lvl;
			this.word = allWords[lvl];
			this.doneWords = allDoneWords[this.word];
			if(allDoneWords[this.word] === 1){
				this.doneWords = wordsFromWords[this.word];
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



			this.letters = this.word.split('');
			this.nowWords = wordsFromWords[this.word].slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});

			this.levelStars = testStar(this.doneWords.length, this.nowWords.length);

			this.findNotShowLetters();

			this.tryShowAdv();
			if(this.doneWords.length === 0){
				if(this.lvl >= 1 && this.lvl <=3){
					this.openLevelHint(this.lvl);
				}else if(this.lvl === 5){
					this.getLvl5Hint();
				}
			}


			this.getLBorBanner();

		},
		getLvl5Hint(){
			if(notRussianGame || isLvlFiveHintDone) return;
			setToStorage('isLvlFiveHintDone', 'true');
			this.cloudHint = true;
			this.cloudsPhrase = lvl5Phrase;
			this.tipCount += 5;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
		},
		getLBorBanner(){
			if(this.verticalPayload) return;
			if(lbWasShowed){
				this.getVerticalBanner();
			}else{
				lbWasShowed = true;
				this.getLeaderBoardInGame();
			}
		},
		closeAllBeforeStartLevel(notSound){
			this.advShowNow = false;
			this.levelsAnim = false;
			this.wordSwing = '';

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
			params({'getLocationLevel': 1});
			this.closeAllBeforeStartLevel();
			this.locationGame = true;
			this.lvl = level;
			this.word = locationWords[this.gameLocation][level];
			this.letters = this.word.split('');

			if(this.eventLocation){
				this.doneWords = eventProgress[this.word];
				if(eventProgress[this.word] === 1){
					this.doneWords = locationWords.wordsFromWords[this.word];
				}else if(eventProgress[this.word] === undefined){
					eventProgress[this.word] = [];
					this.doneWords = eventProgress[this.word];
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
				isShowBanner = true;
				this.getVerticalBanner();
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
			this.chosenBg = this.chosenBgRight;
		},
		addBuyTips(){
			this.tipCount += TIPS;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
			this.purchaseCompleted = true;
			this.shop = false;
			setStats();
		},
		buyTip(item){
			buyTips(item);
		},
		sendParams(par){
			try{
				params(par);
			}catch(ignored){}

		},
		toggleRules(){
			this.rules = !this.rules;
			this.sendParams({'openRules': 1});
		},
		toggleShop(){
			this.shop = !this.shop;
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
			if(!this.content) return;
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
		nextLevel(){
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
				if(this.lvl+1 === allWords.length){
					this.showLastLevelInfo = true;
					return;
				}
				this.getLevel(this.lvl+1);
			}
		},
		prevLocation(){
			if(this.location > 0){
				this.location--;
				this.clickSound();
			}
		},
		nextLocation(){
			if(!this.showNextLoc) return;
			if(this.location < this.allLocations-1){
				this.location++;
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
		backMenu(){
			if(this.isTutorial) return;
			this.isMyGame = false;
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
			this.tryShowAdv();


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
			if(this.animWordStart !== '' || (this.tipCount < 1 && this.advTimer > 0)) return;
			if(this.tipCount < 1){
				try{
					let that = this;

					let advNotShow = true;

					setTimeout(()=>{
						advNotShow = false;
					}, 2500);

					function getRewardedVideo(){
						YSDK.adv.showRewardedVideo({
							callbacks: {
								onRewarded: () => {
									params({'isRewardedVideo': 1});
									that.addTip(true);
								},
								onError: () => {
									that.toggleShowAdvError();
								}
							}
						})
					}

					YSDK.adv.showFullscreenAdv({
						callbacks: {
							onClose: function(wasShow) {
								console.log('close adv reward');
								advTime = false;
								startAdvTime = true;

								clearTimeout(advTimeout);
								clearInterval(advInterval);
								if(wasShow){
									timeToShowAdv = 65;
									startAdvInterval();
									advTimeout = setTimeout(()=>{
										advTime = true;
									}, 65000);
								}else{
									getRewardedVideo();
									return;
								}
								if(advNotShow){
									that.showAdvTip = true;
									if(!isAdvShowed){
										that.isAdvShowed = true;
										setToStorage('isAdvShowed', 'true');
										isAdvShowed = true;
									}else{
										that.startRewardedTimer();
										// params({'rewardedAdvDontWork': 1});
										return;
									}

								}
								params({'rewardedAdv': 1});
								that.addTip();
							},
							onError: function (e){
								getRewardedVideo();
								console.log('error adv')
								console.log(e);
							}
						}
					});





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
				arr = wordsFromWords[this.word].slice();
			}

			for(let i = 0; i < this.doneWords.length; i++){
				arr.splice(arr.indexOf(this.doneWords[i]), 1);
			}
			let rand = Math.floor(Math.random()*arr.length);
			this.wordFromLetter = arr[rand];
			// if(Math.random() > 0.9){
			// 	this.wordSwing = this.wordFromLetter;
			// }

			this.sendWord();


			if(this.isTutorial && tutorialStep === 16){
				this.cloudHint = false;
				this.selectTip = false;
				tutorialStep++;
				setTimeout(()=>{
					this.cloudHint = true;
					this.cloudsPhrase = cloudPhrases[7];
				}, 2000);
			}
		},
		tryShowAdv(){
			if(this.verticalPayload) return;
			if(!this.isTutorial && this.lvl > 1 && this.advTimer <= 0){
				globalTryShowAdv(this.startRewardedTimer);
			}
		},
		getVerticalBanner(){
			if(this.verticalPayload) return;
			if(isShowBanner && (this.locationGame || this.lvl > 3 || this.isMyGame)){
				this.lbInGame = false;
				getVerticalBanner();
			}
		},
		sendWord(){
			if(this.wordFromLetter.length === 0 || this.isBadWord) return;

			this.getVerticalBanner();

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
								this.cloudsPhrase = cloudPhrases[3];
							}else if(tutorialStep === 10){
								this.cloudsPhrase = cloudPhrases[4];
							}else if(tutorialStep === 15){
								this.cloudsPhrase = cloudPhrases[5];
								this.selectMainWord = 'илот';

								setTimeout(()=>{
									try{
										let scrollEl = document.querySelector('.tutorialSelected');
										scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
									}catch(ignored){}

								}, 200);

							}

						}, 1700);
					}


				}
				//Туториал - END
				setTimeout(()=>{
					try{
						let scrollEl = document.querySelector('.animWordStart');
						scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
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
					if(this.isMyGame){
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
								setToStorage('infoAboutClosedEvent', 'true');
								console.log("DONE");
							}
							setToStorage('eventProgress', JSON.stringify(replaceLevelsToOne(eventProgress, true)));
							eventScore += wordFromLetter.length;

						}else{
							setToStorage('locationDoneWords', JSON.stringify(replaceLevelsToOne(locationDoneWords, true)));
							PLAYESTATE.locationDoneWords = locationDoneWords;
						}

					}else{
						setToStorage('allDoneWords', JSON.stringify(replaceLevelsToOne(allDoneWords)));
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
							scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
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


				if(this.wordFromLetter === this.word){
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
						params({'endMyGame': 1});
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
							saveAllData(false);
						}
					}
				}else{
					setLastLevel();
					if(stars === 1){
						params({'gotLevel': this.lvl});

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
				}
				if(this.isSounds){
					starVolume.play();
				}
				setTimeout(()=>{
					this.getStar = -1;
					if(this.isMyGame) return;
					if(stars === 3){
						this.tipCount += 3;
					}else if(stars === 2){
						this.tipCount += 2;
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
			document.addEventListener('keydown', this.pressKey)
			console.log('Вызов баннера при заходе');
			// getBanner();
			addSwipeTo(this.nextLocation, this.prevLocation, true);
			addSwipeTo(this.eraseWord, this.eraseWord, false);
		})
	}
}
</script>
<style>

</style>
